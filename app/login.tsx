import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigation } from "expo-router";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import getUser from "../components/api/getUser";

const logo = require("@/assets/images/bg.png");

export default function LoginForm() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const refreshToken = userCredential.user.refreshToken;
      await axios.post(
        REACT_APP_API_URL + "/api/signin",
        {
          idToken,
          refreshToken,
        },
        { withCredentials: true }
      );

      getUser()
        .then((user) => {
          // setUser(user as User);
          navigation.navigate("(tabs)");
          console.info("User signed in: ", user);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log("Error signing in: ", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <Image source={logo} style={styles.image} resizeMode="cover" />
      <View style={styles.inputView}>
        <Text style={styles.title}>Sign in</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Don't Have Account?
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("signup")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "white",
    position: "absolute",
    zIndex: 1,
    top: 100,
    left: 0,
  },
  container: {
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    height: "20%",
    width: "100%",
    objectFit: "cover",
    marginBottom: -20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 20,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    height: "200%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "transparent",
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderRadius: 30,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "red",
  },
  button: {
    backgroundColor: "#8C77DA",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    cursor: "pointer",
    textDecorationLine: "underline",
    color: "#8C77DA",
    fontSize: 13,
  },
});
