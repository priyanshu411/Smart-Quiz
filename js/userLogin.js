// import firebase sdk
import { app } from './firebase.js';
import { GoogleAuthProvider ,getAuth,signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
document.getElementById("login").addEventListener("click",loginWithGoogle);
window.onload = removePreloader;



function loginWithGoogle(){

    signInWithPopup(auth, provider)
    .then((result) => {
        if(result.user)
             window.location = "quiz.html";
    }).catch((error) => {
      alert(errorMessage +"\n"+"email :"+ error.email)
    });

}



// remove preloader
function removePreloader(){

    onAuthStateChanged(auth, (user) => {
        if (user && user.providerData[0].providerId.localeCompare("google.com") === 0) {
            window.location = "quiz.html";
        } else {
            document.getElementById("loader").remove();
        }
      });

}