import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { REACT_APP_API_URL } from "@env";

const acceptReq = async (id: string) => {
  const idToken = await getValueFor();
  const res = await axios.get(REACT_APP_API_URL + "/api/acceptRequest", {
    withCredentials: true,
    headers: {
      idToken,
    },
    params: {
      friendId: id,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default acceptReq;
