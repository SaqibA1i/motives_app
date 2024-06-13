import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { getValueFor } from "../helpers/storage";

export const fetchFriendRequests = async () => {
  const idToken = await getValueFor();
  const res = await axios.get(REACT_APP_API_URL + "/api/requests", {
    headers: {
      idToken,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default fetchFriendRequests;
