import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC825dzC9N5o2VV8WBvJmkkGlhCvHoeZe4",
  authDomain: "lab-temp-detector.firebaseapp.com",
  projectId: "lab-temp-detector",
  storageBucket: "lab-temp-detector.appspot.com",
  messagingSenderId: "155385457593",
  appId: "1:155385457593:web:8014c5fb8781a79628e468",
  measurementId: "G-WHFVPZ95RB",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
