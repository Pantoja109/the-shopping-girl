// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbyzIPK1lsVJF1esmo4fjGxl2kfHJ3Kvc",
  authDomain: "the-shopping-girl.firebaseapp.com",
  projectId: "the-shopping-girl",
  storageBucket: "the-shopping-girl.appspot.com",
  messagingSenderId: "583045622574",
  appId: "1:583045622574:web:81e1dae0967a3cd478e8bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
