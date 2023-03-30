import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANOmlr8NbgvHTvfvWp5ghhdjZFxky89U4",
    authDomain: "vexa-56761.firebaseapp.com",
    projectId: "vexa-56761",
    storageBucket: "vexa-56761.appspot.com",
    messagingSenderId: "931330029711",
    appId: "1:931330029711:web:71cd2047b85c7ae54158fa",
    measurementId: "G-YHWF0CN1GY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;