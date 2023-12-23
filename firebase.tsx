import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";
import {getStorage}  from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCiGy7xWI20fCnMbYQQcRv1ByNOVhPzIPE",
    authDomain: "mercuryboxdrop.firebaseapp.com",
    projectId: "mercuryboxdrop",
    storageBucket: "mercuryboxdrop.appspot.com",
    messagingSenderId: "177173114200",
    appId: "1:177173114200:web:0a296e12c5ec81ee09892d",
    measurementId: "G-2LFK2NVDZC"
  };
 
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export {db, storage};