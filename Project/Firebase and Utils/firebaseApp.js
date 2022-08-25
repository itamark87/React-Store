import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  // ADD FIREBASE CONFIGURATION HERE
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


