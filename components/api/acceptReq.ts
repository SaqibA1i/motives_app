import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

import { getValueFor } from "../helpers/storage";
import { auth, db } from "@/app/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const acceptReq = async (id: string) => {
  const uid = auth.currentUser?.uid;
  // update a fields in the document without overwriting the entire document
  await setDoc(doc(db, "friends", id + uid), {
    accepted: true,
    friend_id_1: id,
    friend_id_2: uid,
    timestamp: Date.now(),
  });
};
export default acceptReq;
