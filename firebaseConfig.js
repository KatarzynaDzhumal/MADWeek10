// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsW_vVMKw8LtgwwGmwDWI0lOHN6LYxFwY",
  authDomain: "samplestorage123-dfa6a.firebaseapp.com",
  projectId: "samplestorage123-dfa6a",
  storageBucket: "samplestorage123-dfa6a.firebasestorage.app",
  messagingSenderId: "993735741385",
  appId: "1:993735741385:web:6e1fcd186af660ce592218",
  measurementId: "G-4F3HC0B9CW"

};

// Start Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore database and export it so other files can use it
export const db = getFirestore(app);
export const auth = getAuth(app);
