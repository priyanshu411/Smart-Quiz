// import firebase sdk
import { collection, query, where, getDocs, getFirestore, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { app } from './firebase.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
const auth = getAuth(app);
const db = getFirestore(app);

// preloader remove
window.onload = checkUser;
let eleLogout=document.getElementsByClassName("logout");
eleLogout[0].addEventListener("click", logout);
eleLogout[1].addEventListener("click", logout);

// check user is login or not
function checkUser() {

    onAuthStateChanged(auth, (user) => {
        if (user && user.providerData[0].providerId.localeCompare("google.com") === 0) {    
            let name=document.getElementsByClassName("user-name");
            let pic=document.getElementsByClassName("img-user");
            for(let i=0;i<name.length;i++){
                name[i].innerHTML=user.displayName;
                pic[i].src=user.photoURL;
            }
            removePreloader();
        } else {
            window.location = "index.html";
        }
    });

}
// get questions from firebase
async function getData(sub, arr) {
    const qu = query(collection(db, sub), where('id', "in", arr));
    const data = await getDocs(qu);
    return (data);
}
// get max id of questions from firebase
async function getMaxId(sub) {
    const qu = query(collection(db, sub), orderBy("id", "desc"), limit(1));
    const maxId = await getDocs(qu);
    if (maxId.docs.length > 0) {
        return (maxId.docs[0].data().id);
    } else {
        return (0);
    }
}

window.getData = getData;

// get max id and remove loader
async function removePreloader() {

    // maxobj defined in quiz.js file
    maxIdObj.html = await getMaxId("html");
    maxIdObj.css = await getMaxId("css");
    maxIdObj.js = await getMaxId("js");
    maxIdObj.java = await getMaxId("java");
    maxIdObj.c = await getMaxId("c");
    maxIdObj.cpp = await getMaxId("cpp");
    document.getElementById("loader").remove();
}

// logout user
function logout() {

    signOut(auth).then(() => {
        window.location = "index.html"
    }).catch((error) => {
        M.toast({ html: error.code, displayLength: 4000, classes: "red darken-1" });
    });

}
