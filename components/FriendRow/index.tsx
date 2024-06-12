import { useUser } from "../Wrappers/User";
import FriendHighlight from "./FriendHighlight";

function FriendRow() {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <FriendHighlight friend={user} />;
}

export default FriendRow;
