import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore

import { getValueFor } from "../helpers/storage";
import { auth, db } from "@/app/firebaseConfig";
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";

export const fetchMyFriends = async () => {
  const uid = auth.currentUser?.uid;
  const friends = query(
    collection(db, "friends"),
    // where("friend_id_1", "==", id)
    and(
      or(where("friend_id_1", "==", uid), where("friend_id_2", "==", uid)),
      where("accepted", "==", true)
    )
  );
  const friendsData = await getDocs(friends);

  const res = [];
  for (const friend of friendsData.docs) {
    const { friend_id_1, friend_id_2 } = friend.data();
    const id = friend_id_1 === uid ? friend_id_2 : friend_id_1;
    const user = await getDoc(doc(db, "users", id));
    res.push({ id: id, ...user.data() });
  }
  return res;
};
export default fetchMyFriends;
