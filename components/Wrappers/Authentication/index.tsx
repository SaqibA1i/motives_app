import React, { useEffect, useState } from "react";
import { UserProvider } from "../User";
import { User } from "../User/type";
import getUser from "../../api/getUser";
import { useNavigation } from "expo-router";
import { useQuery } from "react-query";

interface Props {
  children: React.ReactNode;
}
const AuthWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: userData, isError, isSuccess } = useQuery("user", getUser);
  const navigation = useNavigation();
  useEffect(() => {
    if (userData) {
      console.log("USER RECEIVED", userData);
      setUser(userData as User);
    } else {
      navigation.navigate("login");
    }
  }, [userData]);
  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};

export default AuthWrapper;
