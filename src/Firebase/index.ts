import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink as FBisSignInWithEmailLink,
  signInWithEmailLink as FBsignInWithEmailLink,
  signInWithCustomToken as FBsignInWithCustomToken,
  getIdToken as FBgetIdToken,
  User,
} from "firebase/auth";
import { createUserEndpoint } from "../Requests";
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
  createUser: (email: string, password: string) => {
    return createUserEndpoint({ email, password });
  },
  signInUser: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
  signInWithCustomToken: (token: any) => {
    return FBsignInWithCustomToken(auth, token)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
  sendAuthLinkToEmail: (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000",
      // This must be true.
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        debugger;
      });
  },
  isSignInWithEmailLink: () => {
    return FBisSignInWithEmailLink(auth, window.location.href);
  },
  signInWithEmailLink: () => {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      /// email = window.prompt("Please provide your email for confirmation");
      return;
    }

    return FBsignInWithEmailLink(auth, email, window.location.href).then(
      (userCredential) => {
        window.localStorage.removeItem("emailForSignIn");
        return { data: userCredential.user, status: 1 };
      }
    );
  },
  getIdToken: (user: User) => {
    return FBgetIdToken(user, true);
  },
};
