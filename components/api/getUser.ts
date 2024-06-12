import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/convertKeysToCamelCase";

const getUser = async () => {
  const res = await axios.get(process.env.REACT_APP_API_URL + "/api/m_user", {
    withCredentials: true,
  });
  return convertKeysToCamelCase(res.data);
};
export default getUser;
