import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore

import { getValueFor } from "../helpers/storage";

export const fetchFriendRequests = async () => {
  const idToken = await getValueFor();
  const res = await axios.get("https://go.mydwelling.ca" + "/api/requests", {
    headers: {
      idToken,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default fetchFriendRequests;
