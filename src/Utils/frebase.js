import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDxGCaXj_k6n9oYnW9vAF1uNDEFOLVuW68",
    authDomain: "react-project-31bab.firebaseapp.com",
    projectId: "react-project-31bab",
    storageBucket: "react-project-31bab.appspot.com",
    messagingSenderId: "29200885934",
    appId: "1:29200885934:web:95c1fef2a12e0d3aef253f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {app, db, storage, analytics, auth};