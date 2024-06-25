import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { useUser } from "@/components/Wrappers/User";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendRow from "@/components/FriendRow";
import { Stack } from "@/components/ui";
import { useState } from "react";
import CreateMotive from "@/components/CreateMotive";
import { useQuery } from "react-query";
import myMotives from "@/components/api/myMotives";
import Motive from "@/components/Motive";

export default function HomeScreen() {
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const { data: motives, isLoading: loading } = useQuery(
    "myMotives",
    myMotives
  );

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FriendRow />
      <View style={styles.containerBody}>
        <Text style={styles.btn} onPress={() => setShow(true)}>
          + Create Motive
        </Text>
      </View>
      <View style={show ? styles.Modal : styles.hidden}>
        <CreateMotive onCancel={() => setShow(false)} />
      </View>
      <ScrollView style={styles.MotiveCont}>
        {motives &&
          motives.map((motive) => (
            <Motive
              key={motive.id}
              user={motive.user}
              location={motive.location}
              date={motive.time_date}
              down={[]}
              notDown={[]}
              status={motive.status}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MotiveCont: {
    width: "100%",
    padding: 20,
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  Modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "120%",
    minHeight: "100%",
    paddingVertical: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
    height: "100%",
  },
  containerBody: {
    backgroundColor: "#F4F2FF",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  btn: {
    backgroundColor: "#8D78D9",
    color: "white",
    borderRadius: 40,
    width: "100%",
    padding: 20,
    cursor: "pointer",
  },
});
