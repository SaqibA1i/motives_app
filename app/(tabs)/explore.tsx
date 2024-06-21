import { StyleSheet, Text, TextInput, View } from "react-native";

import { useUser } from "@/components/Wrappers/User";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendRow from "@/components/FriendRow";
import { useEffect, useState } from "react";
import { Friend, User } from "@/components/types";
import searchUsers from "@/components/api/searchUsers";
import fetchFriendRequests from "@/components/api/fetchFriendRequests";
import Card from "@/components/ui/Card";
import { Stack } from "@/components/ui";
import axios from "axios";
import FriendHighlight from "@/components/FriendRow/FriendHighlight";
import acceptReq from "@/components/api/acceptReq";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";

export default function HomeScreen() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<User[]>([]);

  const queryClient = useQueryClient();

  const { data: friendsU, isLoading: loading } = useQuery(
    ["friends_search", search],
    searchUsers
  );
  const { data: requests, isLoading: loadingReq } = useQuery(
    "friends_req",
    fetchFriendRequests
  );
  // send a request to the backend 1s after the user stops typing
  useEffect(() => {
    // fetch friends from the backend
    // setFriends(friends);
    let temp = [];
    for (let a in friendsU) {
      //@ts-ignore
      temp.push(friendsU[a] as Friend);
    }
    setFriends(temp);
  }, [friendsU]);
  // get friend requests

  const accept = (id: string) => {
    acceptReq(id).then((res) => {
      console.log(res);
      queryClient.invalidateQueries("friends");
      queryClient.invalidateQueries("friends_req");
      queryClient.invalidateQueries("friends_search");
    });
  };
  if (!user) {
    return null;
  }
  console.log("REQUESTS:, ", requests);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Requests:</Text>
      {requests && Object.keys(requests).length === 0 && (
        <Text>No requests</Text>
      )}
      <Stack direction="row" gap={10} alignItems="stretch">
        {requests &&
          Object.keys(requests).map((fri) => {
            const friend = requests[fri] as User;
            return (
              <Stack direction="column" gap={10} alignItems="stretch">
                <FriendHighlight friend={friend} key={friend.id} />
                <Text
                  onPress={() => {
                    accept(friend.id);
                  }}
                  style={styles.accept}
                >
                  + Accept
                </Text>
              </Stack>
            );
          })}
      </Stack>
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
    height: "100%",
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
    marginBottom: 20,
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
