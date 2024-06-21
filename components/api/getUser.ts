import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";
import { getValueFor } from "../helpers/storage";

const getUser = async () => {
  const tokens = await getValueFor();
  const res = await axios.get(process.env.REACT_APP_API_URL + "/api/m_user", {
    headers: {
      idToken: tokens,
    },
  });
  return convertKeysToCamelCase(res.data);
};
export default getUser;
