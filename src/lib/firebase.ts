
'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// This is the server-fetched and verified Firebase configuration.
const firebaseConfig = {
  "projectId": "ayurnidaan-5c1te",
  "appId": "1:1046462212647:web:ffa98d7beec68a45613c02",
  "storageBucket": "ayurnidaan-5c1te.firebasestorage.app",
  "apiKey": "AIzaSyBdsh6LT135c_A18dIuvtucBxYWthIE7Yc",
  "authDomain": "ayurnidaan-5c1te.firebaseapp.com",
  "messagingSenderId": "1046462212647"
};

let app;
// This check ensures we're on the client-side and Firebase is initialized only once.
if (typeof window !== 'undefined') {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
} else {
    // For server-side, initialize without dynamic config if needed elsewhere,
    // though auth is primarily a client-side operation here.
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
}

const auth = getAuth(app);

export { app, auth };
