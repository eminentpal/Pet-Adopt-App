// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "eminentpal-f3f8d.firebaseapp.com",
  projectId: "eminentpal-f3f8d",
  storageBucket: "eminentpal-f3f8d.appspot.com",
  messagingSenderId: "607601944293",
  appId: "1:607601944293:web:cdb35ed3a946f5674e160c",
  measurementId: "G-MPTW8HRXZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
//const analytics = getAnalytics(app)
