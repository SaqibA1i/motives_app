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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Stack } from "@/components/ui";

const logo = require("@/assets/images/bg.png");

export default function SignUp() {
  const [click, setClick] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    if (image === null) {
      Alert.alert("Please select an image first!");
      return;
    }
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    });
    setUploading(false);
    Alert.alert("Photo uploaded!");
    setImage(null);
  };

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
    if (!fullName || !email || !password) {
      throw "Please fill in all fields";
    }
    setUploading(true);
    try {
      if (image !== null) {
        await uploadImage();
      }
      const userRecord = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userRecord.user.uid) {
        throw "user not created in firestore";
      }
      // create user in firestore
      await setDoc(doc(db, "users", userRecord.user.uid), {
        email,
        name: fullName,
        img_url: image
          ? image.uri.substring(image.uri.lastIndexOf("/") + 1)
          : null,
      });

      // route to login after 1s
      await setTimeout(() => {
        navigation.navigate("login");
      }, 1000);
      setUploading(false);
    } catch (error) {
      console.log("Error signing up: ", JSON.stringify(error));
      setError(error.response?.data?.error || "Internal Server Error");
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Motives App!</Text>
      <Image source={logo} style={styles.image} resizeMode="cover" />
      <View style={styles.inputView}>
        <Text style={styles.title}>Sign Up</Text>
        <Stack
          alignItems="center"
          direction="column"
          style={styles.ImagePreview}
        >
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "blue" }}>Select Profile Picture</Text>
          </TouchableOpacity>
        </Stack>
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
          {uploading && <Text>Uploading...</Text>}
          {!uploading && (
            <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          )}
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
  ImagePreview: {},
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
