// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEhDf_z-HTlit9suWItzmHcpojTNc7IyM",
  authDomain: "authentication-59a39.firebaseapp.com",
  projectId: "authentication-59a39",
  storageBucket: "authentication-59a39.appspot.com",
  messagingSenderId: "714342017529",
  appId: "1:714342017529:web:f66d5e38214ee7ce433528"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Make sure to pass 'app' to getAuth

export { auth };