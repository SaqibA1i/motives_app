import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import FriendHighlight from "../../FriendRow/FriendHighlight";
import { Friend } from "../../types";
import addFriend from "../../api/addFriend";
import acceptReq from "../../api/acceptReq";
import { useNavigation } from "expo-router";

import { useMutation, useQueryClient } from "react-query";

const Card = ({ user }: { user: Friend }) => {
  const { id, status } = user;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries("friends");
  }, []);
  const mutation = useMutation(addFriend, {
    onSuccess: (_res) => {
      queryClient.invalidateQueries("friends");
      queryClient.invalidateQueries("friends_search");
    },
  });
  const sendReq = () => {
    mutation.mutateAsync(id).catch((err) => {
      console.log(err);
    });
  };
  const accept = () => {
    acceptReq(id).then((res) => {
      console.log(res);
      // refresh the page in react native
      queryClient.invalidateQueries("friends");
      queryClient.invalidateQueries("friends_req");
      queryClient.invalidateQueries("friends_search");
    });
  };
  return (
    <View style={styles.container}>
      <FriendHighlight friend={user} />
      <View style={styles.col}>
        <Text style={styles.name}>{user.email}</Text>
        {status[0] === 0 && (
          <Text style={styles.add} onPress={sendReq}>
            + Add Friend
          </Text>
        )}
        {status[0] === 3 && <Text style={styles.add2}>✓ Friends</Text>}

        {status[0] === 1 && (
          <>
            <Text style={styles.add2}>✉ Request Sent</Text>
            <Text style={styles.add2}>{new Date(status[1]).toUTCString()}</Text>
          </>
        )}
        {status[0] === 2 && (
          <Text onPress={accept} style={styles.accept}>
            {" "}
            + Accept{" "}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    gap: 20,
    padding: 15,
    marginVertical: 10,
  },
  col: {
    gap: 10,
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  name2: {
    fontSize: 15,
    color: "black",
  },
  accept: {
    color: "#52c84a",
    fontSize: 15,
    borderRadius: 20,
    border: "2px solid #52c84a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    width: 100,
    cursor: "pointer",
  },
  add: {
    color: "#6FB6E9",
    fontSize: 15,
    borderRadius: 20,
    border: "2px solid #6FB6E9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    cursor: "pointer",
  },
  add2: {
    color: "#6FB6E9",
    fontSize: 15,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    textAlign: "left",
  },
});
export default Card;
