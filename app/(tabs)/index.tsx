import { StyleSheet, Text, View } from "react-native";

import { useUser } from "@/components/Wrappers/User";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendRow from "@/components/FriendRow";
import { Stack } from "@/components/ui";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { user } = useUser();
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date());
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
        <View style={styles.content}>
          <Stack direction="row" justifyContent="space-between">
            <Text>Create a Motive</Text>
            <Text onPress={() => setShow(false)}>X</Text>
          </Stack>
          <DatePicker mode="datetime" date={date} onDateChange={setDate} />
          <Text>Description: </Text>
          <TextInput />
          <Text>Location:</Text>
          <TextInput />

          <Text>Show Motive to:</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  Modal: {
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    height: "200%",
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
