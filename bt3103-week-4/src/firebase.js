import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Ugy1FLXLN2CXYhSbSpmHDyr0o1uLGQg",
  authDomain: "bt3103-week-6-4a1b5.firebaseapp.com",
  projectId: "bt3103-week-6-4a1b5",
  storageBucket: "bt3103-week-6-4a1b5.appspot.com",
  messagingSenderId: "1010006989230",
  appId: "1:1010006989230:web:cccc6e693760d7cb55103f",
  measurementId: "G-BN69SGFY6K"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;