import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBopPCSge0pf3PvWAMVJgkz_zmb_cz3eK8",
  authDomain: "sparta-react-basic-a3d91.firebaseapp.com",
  projectId: "sparta-react-basic-a3d91",
  storageBucket: "sparta-react-basic-a3d91.appspot.com",
  messagingSenderId: "320412729298",
  appId: "1:320412729298:web:16299a03de02d43f16120b",
  measurementId: "G-K7ZVS5N7ZF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
