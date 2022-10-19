import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv6UzdFScsd4bd7hCCU94vJ1QSkvtUBls",
  authDomain: "whatsapp-clone-f4523.firebaseapp.com",
  projectId: "whatsapp-clone-f4523",
  storageBucket: "whatsapp-clone-f4523.appspot.com",
  messagingSenderId: "444498886980",
  appId: "1:444498886980:web:75cede95392afa3e811711",
  measurementId: "G-ZSL6JWG45F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log("auth", auth);
export const FirebaseActions = {
  createUser: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Signed in
        // const user = userCredential.user;
        return { data: response.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
        // ..
      });
  },
  signInUser: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
};
