import React, { useEffect, useState } from "react";
import { UserProvider } from "../User";
import getUser from "../../api/getUser";
import { useNavigation } from "expo-router";
import { useQuery } from "react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/components/types";

interface Props {
  children: React.ReactNode;
}
const AuthWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        getDoc(doc(db, "users", user.uid))
          .then((user) => {
            const userData = user.data();
            console.log("userData", userData);
            userData &&
              setUser({
                id: user.id,
                email: userData.email,
                name: userData.name,
                img_url: userData.img_url ?? null,
              });
            navigation.navigate("(tabs)");
          })
          .catch((error) => {
            navigation.navigate("login");
          });
      }
    });
  }, []);
  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};

export default AuthWrapper;
