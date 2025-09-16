import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuFvdZPEVP5UadbrlKIcFiZONLZCd53oQ",
  authDomain: "myblog-d64ee.firebaseapp.com",
  projectId: "myblog-d64ee",
  storageBucket: "myblog-d64ee.firebasestorage.app",
  messagingSenderId: "609823930765",
  appId: "1:609823930765:web:e6c30c8cd223ef2e7fe5c4",
  measurementId: "G-PN43WCKJXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
// const analytics = getAnalytics(app);

export { app , auth , db }