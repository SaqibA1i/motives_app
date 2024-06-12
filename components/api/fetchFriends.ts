import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { REACT_APP_API_URL } from "@env";

const fetchFriends = async (search: string) => {
  const res = await axios.get(REACT_APP_API_URL + "/api/searchFriends", {
    withCredentials: true,
    params: {
      search: search,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default fetchFriends;
