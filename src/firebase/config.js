import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG4InX5pTUmdQ2_oK0vuZ0i3GLJJ1vA5A",
  authDomain: "team-vanguard-project-manager.firebaseapp.com",
  projectId: "team-vanguard-project-manager",
  storageBucket: "team-vanguard-project-manager.appspot.com",
  messagingSenderId: "917525885857",
  appId: "1:917525885857:web:eb5f73cc6202c8f3a611e0",
  measurementId: "G-RQFZ4EC68D",
};

firebase.initializeApp(firebaseConfig);

const firestoreTools = firebase.firestore();
const authTools = firebase.auth();
const storageTools = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { firestoreTools, authTools, storageTools, timestamp };