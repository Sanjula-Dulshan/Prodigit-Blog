// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f3e3d.firebaseapp.com",
  projectId: "mern-blog-f3e3d",
  storageBucket: "mern-blog-f3e3d.appspot.com",
  messagingSenderId: "924451280878",
  appId: "1:924451280878:web:924f901b410bb09e3720ff",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
