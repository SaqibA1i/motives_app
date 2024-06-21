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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import getUser from "../components/api/getUser";
import { useNavigation } from "expo-router";
import { Input } from "@/components/ui/Input";
import { launchImageLibrary } from "react-native-image-picker";

import { db, storage } from "./firebaseConfig";

const logo = require("@/assets/images/bg.png");

export default function SignUp() {
  const [click, setClick] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(REACT_APP_API_URL + "/api/signup_m", {
        email: email,
        password: password,
        fullName: fullName,
      });

      // route to login after 1s
      setTimeout(() => {
        navigation.navigate("login");
      }, 1000);
    } catch (error) {
      console.log("Error signing up: ", JSON.stringify(error));
      setError(error.response?.data?.error || "Internal Server Error");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Motives App!</Text>
      <Image source={logo} style={styles.image} resizeMode="cover" />
      <View style={styles.inputView}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Have An Account?
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("login")}
          >
            {" "}
            Log In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "white",
    position: "absolute",
    zIndex: 1,
    top: 30,
    left: 0,
  },
  container: {
    alignItems: "center",
    top: 0,
    backgroundColor: "black",
  },
  image: {
    height: "10%",
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
    fontSize: 15,
  },
  signup: {
    cursor: "pointer",
    textDecorationLine: "underline",
    color: "#8C77DA",
  },
});
