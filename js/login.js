// import firebase sdk
import { app } from './firebase.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
const auth = getAuth(app);
document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("forget-pass").addEventListener("click", forgetPass);

// if user not login
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = "addData.html";
    }
    else {
        // preloader remove
        document.getElementById("loader").remove();
        M.toast({ html: "login With your email & password", displayLength: 4000, classes: "green accent-4" });
    }
});


// login
function login() {
    event.preventDefault();
    document.getElementById("login").classList.add("hide");
    document.getElementById("loading").classList.remove("hide");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password).then(function (user) {
        if (user)
            window.location = "addData.html";
    })
        .catch(function (error) {
            document.getElementById("loading").classList.add("hide");
            document.getElementById("login").classList.remove("hide");
            M.toast({ html: error.code, displayLength: 4000, classes: "red darken-1" });
        });
}

// forget password
function forgetPass() {
    event.preventDefault();
    let email = prompt("Enter email to reset password");
    if (email != null) {
        console.log(email)
        sendPasswordResetEmail(auth, email)
            .then(function () {
                M.toast({ html: "Password reset email sent!", displayLength: 4000, classes: "green accent-4" });
            })
            .catch(function (error) {
                M.toast({ html: error.code, displayLength: 4000, classes: "red darken-1" });
            });
    }
}