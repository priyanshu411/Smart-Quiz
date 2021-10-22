// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJEFMVCj-5jWHSY_zyOcGhSyWKfyJV0T0",
    authDomain: "smart-quiz-pg.firebaseapp.com",
    projectId: "smart-quiz-pg",
    storageBucket: "smart-quiz-pg.appspot.com",
    messagingSenderId: "117210588238",
    appId: "1:117210588238:web:81dffa6038cc4f8dd48f1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export{app}