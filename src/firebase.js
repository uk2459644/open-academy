// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider,PhoneAuthProvider,signInWithPopup,signInWithPhoneNumber} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHYnBwTL8hGiW7bOfUcIP1_-T-SeqiFc4",
  authDomain: "open-academy-63ad7.firebaseapp.com",
  projectId: "open-academy-63ad7",
  storageBucket: "open-academy-63ad7.appspot.com",
  messagingSenderId: "459991496971",
  appId: "1:459991496971:web:4bd3623352e9e2ab4e8a0e",
  measurementId: "G-RG28YXDHJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider= new GoogleAuthProvider();
const facebookProvider= new FacebookAuthProvider();
const phoneAuthProvider=new PhoneAuthProvider();
const auth = getAuth();

export {app,analytics};
