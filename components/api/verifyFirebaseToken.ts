import { getValueFor } from "../helpers/storage";
import { auth } from "../../app/firebaseConfig";

const verifyFirebaseToken = async () => {
  // get the header
  const idToken = await getValueFor();

  if (!idToken) {
    console.log("NO TOKEN PROVIDED");
    return null;
  }
  try {
    // const decodedToken = await verifyIdToken(auth, idToken);
    // return decodedToken.uid;
    return idToken;
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return null;
  }
};
export default verifyFirebaseToken;
