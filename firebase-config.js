import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6xQbkK9ssXN7uVKLkwwb-YYGORKtAk1c",
  authDomain: "ccompauth.firebaseapp.com",
  projectId: "ccompauth",
  storageBucket: "ccompauth.appspot.com",
  messagingSenderId: "13398955395",
  appId: "1:13398955395:web:635c372580710f84c752b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPooling: true});


export {app, auth, db};