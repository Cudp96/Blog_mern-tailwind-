// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "blog-mern-bd2d7.firebaseapp.com",
  projectId: "blog-mern-bd2d7",
  storageBucket: "blog-mern-bd2d7.appspot.com",
  messagingSenderId: "339675433793",
  appId: "1:339675433793:web:83d6347880df9496e52fc0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
