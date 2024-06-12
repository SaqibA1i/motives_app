import React, { useEffect, useState } from "react";
import { UserProvider } from "../User";
import { User } from "../User/type";
import getUser from "../../api/getUser";
import { useNavigation } from "expo-router";

interface Props {
  children: React.ReactNode;
}
const AuthWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(user as User);
        // NotificationManager.success("You are signed in!");
      })
      .catch((_err) => {
        getUser()
          .then((user) => {
            setUser(user as User);
            //@ts-ignore
          })
          .catch((_err) => {
            navigation.navigate("login");
            // NotificationManager.info(
            //   "In order to make the most of our services, please sign in."
            // );
          });
      });
  }, []);
  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};

export default AuthWrapper;
