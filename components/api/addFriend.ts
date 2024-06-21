import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

import { getValueFor } from "../helpers/storage";

const addFriend = async (id: string) => {
  const idToken = await getValueFor();
  return await axios.get("https://go.mydwelling.ca" + "/api/addFriend", {
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
