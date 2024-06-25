import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
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
import { COLLECTIONS } from "../../constants/Collections";

const myMotives = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  // get the motives from users table
  const user = await getDoc(doc(db, COLLECTIONS.USERS, uid));
  const motivesIds = user.data()?.motives;
  console.log("MOTIVES: ", motivesIds);
  const motives: any[] = [];
  for (const motiveId of motivesIds) {
    const motive = (
      await getDoc(doc(db, COLLECTIONS.MOTIVE, motiveId))
    )?.data();
    //get the user who created the motive
    const user = await getDoc(doc(db, COLLECTIONS.USERS, motive?.user_id));
    motives.push({ ...motive, user: user.data() });
  }
  console.log(motives);
  return motives;
};
export default myMotives;
