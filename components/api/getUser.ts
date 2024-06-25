import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const getUser = async () => {
  try {
    let collectionName = "users";
    const user = await getDoc(doc(db, collectionName, "41vICrKEokiwIEr976NN"));
    console.log(user.data());
    return user;
  } catch (error) {
    throw new Error("Oh no!");
  }
};
export default getUser;
