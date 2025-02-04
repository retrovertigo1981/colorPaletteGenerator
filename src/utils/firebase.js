// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCDcCMl9oF_UI1zJEw8S4-Jyfoqgum16E",
    authDomain: "colorsitosapp.firebaseapp.com",
    projectId: "colorsitosapp",
    storageBucket: "colorsitosapp.firebasestorage.app",
    messagingSenderId: "702475870173",
    appId: "1:702475870173:web:43ec0c12599c8e009ce034",
    measurementId: "G-PLP45ZFR44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app); 