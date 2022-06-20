import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyACJCaVASHoJbmhjPPcz1I4XLG29-oCGyc",
  authDomain: "react-18751.firebaseapp.com",
  projectId: "react-18751",
  storageBucket: "react-18751.appspot.com",
  messagingSenderId: "927365204021",
  appId: "1:927365204021:web:9261b45eed8b6f3f6cc97c",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
