import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp3SsBf0740Xz_gZxZ2kWbCjs9_M0ORhk",
  authDomain: "nwitter-907c3.firebaseapp.com",
  projectId: "nwitter-907c3",
  storageBucket: "nwitter-907c3.appspot.com",
  messagingSenderId: "883083270925",
  appId: "1:883083270925:web:a52e1d972e8cb22e8d6e44"
  };

   firebase.initializeApp(firebaseConfig);
   
   export const firebaseInstance=firebase;
  export const authService=firebase.auth();
  export const  dbService=firebase.firestore();
  export const  storageService=firebase.storage();