
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "ayurnidaan-5c1te",
  "appId": "1:1046462212647:web:ffa98d7beec68a45613c02",
  "storageBucket": "ayurnidaan-5c1te.firebasestorage.app",
  "apiKey": "AIzaSyBdsh6LT135c_A18dIuvtucBxYWthIE7Yc",
  "authDomain": "ayurnidaan-5c1te.firebaseapp.com",
  "messagingSenderId": "1046462212647"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
