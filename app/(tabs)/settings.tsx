import { clear } from "@/components/helpers/storage";
import { useNavigation } from "expo-router";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQueryClient } from "react-query";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/components/Wrappers/User";
import FriendHighlight from "@/components/FriendRow/FriendHighlight";

export default function TabTwoScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  if (!user) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <FriendHighlight friend={user} size={200} />
      <Text style={styles.Text}>{user.name}</Text>
      <Text style={styles.Text}>{user.email}</Text>
      <View style={styles.logout}>
        <Button
          color="#c62626"
          title="Logout"
          onPress={() => {
            // delete the token from keychain
            SecureStore.deleteItemAsync("idToken").then(() => {
              // navigate to login
              // @ts-ignore
              navigation.navigate("login");
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
  },

  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
    top: 0,
  },
  logout: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    margin: 30,
    borderRadius: 20,
    backgroundColor: "#c62626",
    //@ts-ignore
    border: "2px solid red",
  },
});
