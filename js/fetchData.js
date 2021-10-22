// import firebase sdk
import { collection, query, where, getDocs, getFirestore, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { app } from './firebase.js'

// preloader remove
window.onload = removePreloader;

const db = getFirestore(app);

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
