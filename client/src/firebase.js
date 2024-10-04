// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dreamfitlk.firebaseapp.com",
  projectId: "dreamfitlk",
  storageBucket: "dreamfitlk.appspot.com",
  messagingSenderId: "135783528296",
  appId: "1:135783528296:web:1946fe8c6f8164a50a08dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);