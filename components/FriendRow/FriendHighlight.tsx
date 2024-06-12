import React from "react";
import { User } from "../types";
import { View, Text, StyleSheet } from "react-native";

const FriendHighlight = ({ friend }: { friend: User }) => {
  if (!friend) return null;
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.icon}>
          {friend.name[0]}.{friend.name[friend.name.length - 1]}
        </Text>
      </View>
      <Text style={styles.email}>{friend.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "grey",
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 0,
    justifyContent: "center",
    textTransform: "uppercase",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    fontSize: 10,
  },
});
export default FriendHighlight;
