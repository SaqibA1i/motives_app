import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { REACT_APP_API_URL } from "@env";

const addFriend = async (id: string) => {
  const res = await axios.get(REACT_APP_API_URL + "/api/addFriend", {
    withCredentials: true,
    params: {
      friendId: id,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default addFriend;
