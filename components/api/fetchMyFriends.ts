import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore

import { getValueFor } from "../helpers/storage";

export const fetchMyFriends = async () => {
  const idToken = await getValueFor();
  console.log("\n\n\nREFETCHING\n\n\n");
  const res = await axios.get("https://go.mydwelling.ca" + "/api/friends", {
    withCredentials: true,
    headers: {
      idToken,
    },
  });

  return convertKeysToCamelCase(res.data);
};
export default fetchMyFriends;
