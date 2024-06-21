import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { getValueFor } from "../helpers/storage";

export const fetchFriendsHelper = async (search?: string) => {
  const idToken = await getValueFor();
  const res = await axios.get(REACT_APP_API_URL + "/api/searchFriends", {
    withCredentials: true,
    headers: {
      idToken,
    },
    params: {
      search: search,
    },
  });
  return res.data;
};
const searchUsers = async ({ queryKey }: any) => {
  const [_, search] = queryKey;
  const res = await fetchFriendsHelper(search);
  return convertKeysToCamelCase(res);
};
export default searchUsers;
