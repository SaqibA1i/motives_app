import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtIZiVsXzamynwJukckHVpzfocTd0wrgU", // TODO REMOVE
  authDomain: "my-dwelling-codele.firebaseapp.com",
  projectId: "my-dwelling-codele",
  storageBucket: "my-dwelling-codele.appspot.com",
  messagingSenderId: "657964386144",
  appId: "1:657964386144:web:af8a54b9813f170b810005",
  measurementId: "G-HMQ8SLZ9CH",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, firebaseConfig };
