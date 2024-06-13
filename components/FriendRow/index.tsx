import { useUser } from "../Wrappers/User";
import FriendHighlight from "./FriendHighlight";
import { useQuery } from "react-query";
import fetchMyFriends from "../api/fetchMyFriends";
import { Stack } from "../ui";
import { ScrollView, StyleSheet } from "react-native";

function FriendRow() {
  const { user } = useUser();
  // get all the friends
  const { data: friends } = useQuery("friends", fetchMyFriends);
  if (!user) {
    return null;
  }
  console.log(friends);
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={{ gap: 20 }}
    >
      <FriendHighlight friend={user} />
      {friends &&
        Object.keys(friends).map((friend) => (
          <FriendHighlight key={friends[friend].id} friend={friends[friend]} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 100,
    width: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
  },
});
export default FriendRow;
