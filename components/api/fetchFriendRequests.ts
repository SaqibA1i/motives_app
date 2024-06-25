import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore

import { getValueFor } from "../helpers/storage";
import { auth, db } from "@/app/firebaseConfig";
import {
  query,
  collection,
  and,
  or,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

export const fetchFriendRequests = async () => {
  const uid = auth.currentUser?.uid;
  const friends = query(
    collection(db, "friends"),
    // where("friend_id_1", "==", id)
    and(where("friend_id_2", "==", uid), where("accepted", "==", false))
  );
  const friendsData = await getDocs(friends);

  const res = [];
  for (const friend of friendsData.docs) {
    const { friend_id_1 } = friend.data();
    const user = await getDoc(doc(db, "users", friend_id_1));
    res.push({ id: user.id, ...user.data() });
  }
  return res;
};
export default fetchFriendRequests;
