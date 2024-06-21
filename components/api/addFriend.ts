import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { REACT_APP_API_URL } from "@env";
import { getValueFor } from "../helpers/storage";

const addFriend = async (id: string) => {
  const idToken = await getValueFor();
  return await axios.get(REACT_APP_API_URL + "/api/addFriend", {
    withCredentials: true,
    headers: {
      idToken,
    },
    params: {
      friendId: id,
    },
  });
  // return convertKeysToCamelCase(res.data);
};

export default addFriend;
