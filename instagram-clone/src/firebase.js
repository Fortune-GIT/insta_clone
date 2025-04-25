// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5irUQGQNZoSzvM8qsb9wcta7nJOaphvs",
  authDomain: "instaclone-ac3f1.firebaseapp.com",
  projectId: "instaclone-ac3f1",
  storageBucket: "instaclone-ac3f1.firebasestorage.app",
  messagingSenderId: "659097220083",
  appId: "1:659097220083:web:f97e060eb23cacde821886",
  measurementId: "G-K6QDQ8QG6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);