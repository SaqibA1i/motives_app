import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { getValueFor } from "../helpers/storage";

export const fetchMyFriends = async () => {
  const idToken = await getValueFor();
  console.log("\n\n\nREFETCHING\n\n\n");
  const res = await axios.get(REACT_APP_API_URL + "/api/friends", {
    withCredentials: true,
    headers: {
      idToken,
    },
  });

  return convertKeysToCamelCase(res.data);
};
export default fetchMyFriends;
