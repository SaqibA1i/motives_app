import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { REACT_APP_API_URL } from "@env";
import { getValueFor } from "../helpers/storage";

const fetchFriends = async (search: string) => {
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
  return convertKeysToCamelCase(res.data);
};
export default fetchFriends;
