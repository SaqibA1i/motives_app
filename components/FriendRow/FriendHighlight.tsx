import React, { useState } from "react";
import { User } from "../types";
import { View, Text, StyleSheet, Image } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

const FriendHighlight = ({ friend }: { friend: User }) => {
  const [image, setImgUrl] = useState(null);

  if (!friend) return null;

  const { name, img_url } = friend;
  if (img_url) {
    const url = ref(storage, img_url);
    getDownloadURL(url)
      .then((url) => {
        setImgUrl(url);

        console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(image, img_url);
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {image ? (
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={{ uri: image }}
          />
        ) : (
          <Text style={styles.icon}>
            {friend.name[0]}.{friend.name[friend.name.length - 1]}
          </Text>
        )}
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
