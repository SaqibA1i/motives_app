import { StyleSheet, Text, View } from "react-native";

import { useUser } from "@/components/Wrappers/User";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendRow from "@/components/FriendRow";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { User } from "@/components/types";
import fetchFriends from "@/components/api/fetchFriends";
import Card from "@/components/ui/Card";
import { Stack } from "@/components/ui";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import FriendHighlight from "@/components/FriendRow/FriendHighlight";
import acceptReq from "@/components/api/acceptReq";

export default function HomeScreen() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // send a request to the backend 1s after the user stops typing
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      // fetch friends from the backend
      fetchFriends(search)
        .then((friends: any) => {
          // setFriends(friends);
          console.info("Friends: ", friends);
          let temp = [];
          for (let a in friends) {
            temp.push(friends[a] as User);
          }
          setFriends(temp);
          console.log("Friends: ", friends);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);
  // get freind requests
  useEffect(() => {
    axios
      .get(REACT_APP_API_URL + "/api/requests", {
        withCredentials: true,
      })
      .then((res) => {
        setRequests(res.data);
      });
  }, []);
  const accept = (id: string) => {
    acceptReq(id).then((res) => {
      console.log(res);
      // refresh the page in react native
      // navigation.navigate("explore");
    });
  };
  if (!user) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Requests:</Text>
      {requests.length === 0 && <Text>No requests</Text>}
      {requests.map((fri) => (
        <Stack direction="column" gap={10} alignItems="stretch">
          <FriendHighlight friend={fri} key={fri.id} />
          <Text
            onPress={() => {
              accept(fri.id);
            }}
            style={styles.accept}
          >
            +
          </Text>
        </Stack>
      ))}
      {/*Set up a search bar input */}
      <View style={styles.containerBody}>
        <TextInput
          style={styles.input}
          placeholder="Search friends by email / name"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <hr />
        {loading && (
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            Loading...
          </Text>
        )}
        {friends.length === 0 && !loading && <Text>No friends found</Text>}
        <Stack direction="column" gap={10} width="100%" alignItems="stretch">
          {friends.map((friend) => (
            <Card user={friend} key={friend.id} />
          ))}
        </Stack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
  },
  containerBody: {
    backgroundColor: "#F4F2FF",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "transparent",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    width: "100%",
  },
  accept: {
    color: "#52c84a",
    fontSize: 15,
    borderRadius: 50,
    border: "2px solid #52c84a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    cursor: "pointer",
  },
});
