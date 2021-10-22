// import firebase sdk
import { app } from './firebase.js';
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { collection, addDoc, getFirestore, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// all language max id obj
let maxIdObj = {};

window.onload = loadMaxid;

// add EventListener
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("btn-option").addEventListener("click", createOption);
document.getElementById("addForm").addEventListener("submit", validate);

const auth = getAuth(app);
const db = getFirestore(app);


// initialize select tag
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

// if user not login
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = "login.html";
    }
    else {
        document.getElementById("user").innerHTML = user.email;
        // preloader remove
        document.getElementById("loader").remove();
    }
});

// logout
function logout() {
    signOut(auth).then(function () {
        M.toast({ html: "SignOut successfully", displayLength: 1200, classes: "light-green accent-3" });
    }).catch(function (error) {
        M.toast({ html: error.code, displayLength: 1200, classes: "red lighten-1" });
    });
}

//create option
function createOption() {
    let option_list, n, div;
    n = document.getElementById("option").value;
    option_list = document.getElementById("option-list");
    option_list.innerHTML = "";
    if (n > 1) {
        for (let i = 1; i <= n; i++) {
            div = document.createElement("div");
            div.classList.add("input-field", "col", "s12");
            div.appendChild(createInput("option-" + i, "op"));
            div.appendChild(createLabel("option-" + i, "option-" + i));
            option_list.appendChild(div);
        }
        // for answer
        div = document.createElement("div");
        div.classList.add("input-field", "col", "s12");
        div.appendChild(createInput("ans"));
        div.appendChild(createLabel("ans", "Answer(Right option no.)"));
        option_list.appendChild(div);
        option_list.classList.remove("hide");
    }
}

// create label
function createLabel(for_, text) {
    let label = document.createElement("label");
    label.setAttribute("for", for_);
    label.appendChild(document.createTextNode(text));
    return (label);
}

// create input
function createInput(id, css_class) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    input.setAttribute("required", true);
    input.classList.add(css_class);
    return (input);
}

// add questions
function validate() {
    event.preventDefault();
    let que = document.getElementById("code").value;
    let table = document.getElementById("table").value;
    if (table != 0) {
        let ans = Number(document.getElementById("ans").value);
        let option = [];
        let temp = document.getElementsByClassName("op")
        for (let i = 0; i < temp.length; i++) {
            option.push(temp[i].value);
        }
        addQue(table, que, option, ans)
    }
    else {
        alert("Select Language");
    }
}

// add question
async function addQue(table, question, _option, _ans) {
    document.getElementById("addBtngrp").classList.add("hide");
    document.getElementById("loading").classList.remove("hide");
    await addDoc(collection(db, table), {
        id: whichLanguageMaxId(table) + 1,
        que: question,
        option: _option,
        ans: _ans
    }).then(function (doc) {
        incrementMaxId(table);
        document.getElementById("msg").innerHTML = "sub :" + table + ",id :" + doc.id;
        M.toast({ html: "question added id :" + doc.id, displayLength: 3000, classes: "light-green accent-3" });
        document.getElementById("addForm").reset();
        document.getElementById("addBtngrp").classList.remove("hide");
        document.getElementById("loading").classList.add("hide");
        document.getElementById("option-list").innerHTML = "";
    }).catch(function (error) {
        document.getElementById("msg").innerHTML = error.code;
        M.toast({ html: error.code, displayLength: 3000, classes: "red lighten-12" });
        document.getElementById("addBtngrp").classList.remove("hide");
        document.getElementById("loading").classList.add("hide");
        document.getElementById("option-list").innerHTML = "";
    });

}

// get max id
async function getMaxId(sub) {
    const qu = query(collection(db, sub), orderBy("id", "desc"), limit(1));
    const maxId = await getDocs(qu);
    if (maxId.docs.length > 0) {
        return (maxId.docs[0].data().id);
    } else {
        return (0);
    }
}

// which Language MaxId you want
function whichLanguageMaxId(sub) {
    if (sub === "html") {
        return (maxIdObj.html);
    }
    else if (sub === "css") {
        return (maxIdObj.css);
    }
    else if (sub === "js") {
        return (maxIdObj.js);
    }
    else if (sub === "java") {
        return (maxIdObj.java);
    }
    else if (sub === "c") {
        return (maxIdObj.c);
    }
    else if (sub === "cpp") {
        return (maxIdObj.cpp);
    }
}

//increment id by 1 after add question
function incrementMaxId(sub) {
    if (sub === "html") {
        maxIdObj.html++;
    }
    else if (sub === "css") {
        maxIdObj.css++;
    }
    else if (sub === "js") {
        maxIdObj.js++;
    }
    else if (sub === "java") {
        maxIdObj.java++;
    }
    else if (sub === "c") {
        maxIdObj.c++;
    }
    else if (sub === "cpp") {
        maxIdObj.cpp++;
    }
}


// load max id
async function loadMaxid() {
    // maxobj defined in quiz.js file
    maxIdObj.html = await getMaxId("html");
    maxIdObj.css = await getMaxId("css");
    maxIdObj.js = await getMaxId("js");
    maxIdObj.java = await getMaxId("java");
    maxIdObj.c = await getMaxId("c");
    maxIdObj.cpp = await getMaxId("cpp");
}
