
//manejos de firebase desde el cliente

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from 'firebase/auth';                //fj-3
import { getDatabase } from 'firebase/database';        //fj-3


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);       // Firestore
export const auth = getAuth(app);          // Authentication
export const database = getDatabase(app);  // Realtime Database   //fj-3