import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore

import { getValueFor } from "../helpers/storage";
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  or,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";
import { Friend, User } from "../types";

export const fetchFriendsHelper = async (search?: string) => {
  const currentUserId = auth.currentUser?.uid;
  // get the users from firestore depending on the search query
  const first = query(collection(db, "users"));
  const users = await getDocs(first);
  const res: Friend[] = [];
  for (const user of users.docs) {
    //skip the current user
    const id = user.id;
    if (id === currentUserId) {
      continue;
    }
    const { name, email } = user.data();
    if (name.includes(search) || email.includes(search)) {
      // query freinds table now to get status of friendship
      const friend = query(
        collection(db, "friends"),
        // where("friend_id_1", "==", id)
        or(
          and(
            where("friend_id_1", "==", id),
            where("friend_id_2", "==", currentUserId)
          ),
          and(
            where("friend_id_1", "==", currentUserId),
            where("friend_id_2", "==", id)
          )
        )
      );
      const friends = await getDocs(friend);

      if (friends.size === 0) {
        res.push({ id, name, email, status: [0, "null"] });
      } else {
        friends.forEach((friend) => {
          const { friend_id_1, accepted, timestamp } = friend.data();
          // [0, null] - not friends
          // [1, timeStamp] - request sent by me
          // [2, timestamp] - request sent by them
          // [3, null] - friends
          let status = [];
          if (accepted) {
            status = [3, timestamp];
          } else if (friend_id_1 === currentUserId) {
            status = [1, timestamp];
          } else {
            status = [2, timestamp];
          }
          //@ts-ignore
          res.push({ id, name, email, status: status });
        });
      }
    }
  }
  return res;
};
const searchUsers = async ({ queryKey }: any) => {
  const [_, search] = queryKey;
  const res = await fetchFriendsHelper(search);
  console.log(res);
  return convertKeysToCamelCase(res);
};
export default searchUsers;
