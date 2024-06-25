import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

import { getValueFor } from "../helpers/storage";
import { auth, db } from "@/app/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const addFriend = async (id: string) => {
  const currentUserId = auth.currentUser?.uid;
  await setDoc(doc(db, "friends", currentUserId + id), {
    friend_id_1: currentUserId,
    friend_id_2: id,
    accepted: false,
    timestamp: Date.now(),
  });
};

export default addFriend;
