// variable
let flag = true;
let time = 30;
let setI;
let queObj = null;
let maxIdObj = {};
let scoreHistory = [];
let score = 0;
let count = 0;
let randomQues;
let questionbox = document.getElementById("code");

M.Modal.init(document.getElementById("ruleModel"));
let scoreModel = M.Modal.init(document.getElementById("scoreModel"));

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

// submit button
document.getElementById("submitAns").addEventListener("click", checkAns);

// start quiz
async function startQuiz(obj) {
    obj.disabled = true;
    obj.innerHTML = ` <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;
    randomQues = randomArray(whichLanguageMaxId(obj.value));
    await getData(obj.value, randomQues).then(function (data) {
        queObj = data;
        if (queObj.docs.length > 0) {
            nextQue();
            document.getElementById("main").classList.add("hide");
            document.getElementById("question").classList.remove("hide");
            obj.innerHTML = `Start <i class="material-icons right">arrow_forward_ios</i>`;
            obj.disabled = false;
        }
        else {
            alert(obj.value + " :This Language questions not present");
            obj.innerHTML = `Start <i class="material-icons right">arrow_forward_ios</i>`;
            obj.disabled = false;
        }
    }).catch(function (error) {
        M.toast({ html: error.code, displayLength: 4000, classes: "red lighten-1" });
        obj.innerHTML = `Start <i class="material-icons right">arrow_forward_ios</i>`;
        obj.disabled = false;
    });

}

// stop quiz
function stopQuiz() {
    clearInterval(setI);
    flag = true;
    time = 30;
    document.getElementById("main").classList.remove("hide");
    document.getElementById("code").innerHTML = "";
    document.getElementById("optionBox").innerHTML = "";
    document.getElementById("question").classList.add("hide");
    document.getElementById("score").innerHTML = "Your score :" + score;
    showAnswer();
    scoreModel.open();
    queObj = null;
    score = 0;
    scoreHistory = [];
    randomQues = randomArray();;
    count = 0;
}

// show answer

function showAnswer() {
    let sol = document.getElementById("solution");
    sol.innerHTML = "";
    for (let i = 0; i < queObj.docs.length; i++) {
        let data = queObj.docs[i].data();
        let div = document.createElement("div");
        let pre = document.createElement("pre");
        pre.classList.add("blue-grey", "darken-2", "white-text", "p-a")
        let code = document.createElement("code");
        code.innerHTML = data.que; //create text node work
        pre.appendChild(code);
        let p = document.createElement("p");
        p.appendChild(document.createTextNode("Answer :" + data.option[data.ans - 1]));
        p.classList.add("green-text", "text-darken-3");
        div.appendChild(pre);
        div.appendChild(p);
        div.appendChild(document.createElement("hr"));
        sol.appendChild(div);
    }
}

// get next question
function nextQue() {
    if (count < queObj.docs.length) {
        let queData = queObj.docs[count].data();
        questionbox.innerHTML = "";
        questionbox.innerHTML = queData.que;
        createRadio(queData.option, "optionBox");
        setTime();
    }
    else {
        stopQuiz();
    }
}


// check ans
function checkAns() {
    let ans = document.getElementsByClassName("option");
    let checkedOption = true;
    let wright_wrong = true;
    let answer = queObj.docs[count].data().ans;
    for (const key in ans) {
        if (ans[key].checked) {
            checkedOption = false;
            if (ans[key].value == answer) {
                wright_wrong = false;
                score++;
                M.toast({ html: '<i class="material-icons">done</i>Right Answer', displayLength: 1200, classes: "green darken-1" });
                break;
            }
        }
    }
    scoreHistory.push(score);
    count++;
    if (checkedOption) {
        M.toast({ html: '<i class="material-icons">list</i>Not select any option', displayLength: 1200, classes: "blue-grey darken-2" });
    }
    else if (wright_wrong) {
        M.toast({ html: '<i class="material-icons">close</i>Wrong Answer', displayLength: 1200, classes: "red lighten-1" });
    }
    clearInterval(setI);
    flag = true;
    time = 30;
    nextQue();
}

// create radio button for option
function createRadio(option, obj) {
    document.getElementById(obj).innerHTML = "";
    for (let i = 0; i < option.length; i++) {
        let p, input, label, span;
        p = document.createElement("p");
        label = document.createElement("label");
        p.appendChild(label);
        input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "option");
        input.setAttribute("value", i + 1);
        input.classList.add("with-gap", "option");

        label.appendChild(input);
        span = document.createElement("span");
        span.classList.add("black-text");
        span.appendChild(document.createTextNode(option[i]));
        label.appendChild(span);
        document.getElementById(obj).appendChild(p);
    }

}

// random questions
function randomArray(max) {
    let arr = [], i = 1;
    if (max >= 5) {
        while (i <= 5) {
            let no = Math.floor(Math.random() * max) + 1;
            if (!arr.includes(no)) {
                arr.push(no);
                i++;
            }
        }
    }
    return (arr);
}

// start time
function setTime() {
    if (flag) {
        document.getElementById("time").innerHTML = time + "s";
        setI = setInterval(updateTime, 1000);
        flag = false;
    }
}

// update time
function updateTime() {
    if (time > 0) {
        time--;
        document.getElementById("time").innerHTML = time + "s";
    }
    else {
        clearInterval(setI);
        flag = true;
        time = 30;
        // if time over than check ans
        checkAns();
    }
}

// get max id
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
