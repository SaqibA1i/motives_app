import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

import { getValueFor } from "../helpers/storage";

const acceptReq = async (id: string) => {
  const idToken = await getValueFor();
  const res = await axios.get(
    "https://go.mydwelling.ca" + "/api/acceptRequest",
    {
      withCredentials: true,
      headers: {
        idToken,
      },
      params: {
        friendId: id,
      },
    }
  );
  return convertKeysToCamelCase(res.data);
};
export default acceptReq;
