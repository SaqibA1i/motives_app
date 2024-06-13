import { clear } from "@/components/helpers/storage";
import { useNavigation } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQueryClient } from "react-query";
import * as SecureStore from "expo-secure-store";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return (
    <ScrollView style={styles.container}>
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
  container: {
    backgroundColor: "white",
  },
  logout: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    margin: 30,
    marginTop: 500,
    borderRadius: 20,
    //@ts-ignore
    border: "2px solid red",
  },
});
