
'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "ayurnidaan-5c1te",
  "appId": "1:1046462212647:web:ffa98d7beec68a45613c02",
  "storageBucket": "ayurnidaan-5c1te.firebasestorage.app",
  "apiKey": "AIzaSyBdsh6LT135c_A18dIuvtucBxYWthIE7Yc",
  // We will dynamically set the authDomain below
  // "authDomain": "ayurnidaan-5c1te.firebaseapp.com", 
  "messagingSenderId": "1046462212647"
};

let app;
if (typeof window !== 'undefined') {
    if (!getApps().length) {
        // Dynamically set authDomain for client-side execution
        const dynamicConfig = {
            ...firebaseConfig,
            authDomain: window.location.hostname
        };
        app = initializeApp(dynamicConfig);
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
