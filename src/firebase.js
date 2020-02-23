import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyAEy2pfuEmMxeToA_IoTP0T7HfyX9BJ7UM",
  authDomain: "ledger-77550.firebaseapp.com",
  databaseURL: "https://ledger-77550.firebaseio.com",
  projectId: "ledger-77550",
  storageBucket: "ledger-77550.appspot.com",
  messagingSenderId: "940577597455",
  appId: "1:940577597455:web:1c88b551073469e7165b7a",
  measurementId: "G-HTE4KWE3SJ"
};
firebase.initializeApp(config);
export const firestore = firebase.firestore();
// export const database = firebase.database();
