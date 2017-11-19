/*
window.onerror = function(e, u, l) {
    alert(e);
    alert(l);
};
*/

const image = document.querySelector(".img-quest img");
const optionsMode = document.querySelector(".options");
const inputMode = document.querySelector(".input-mode");
const options = document.querySelectorAll(".options .option");

const mainModal = document.querySelector(".hint-modal");
const closeModalBtn = mainModal.querySelector(".modal-body span");
const modalHint = mainModal.querySelector(".modal-body .theHint");
const hintText = modalHint.querySelector("p");
const gameOver = mainModal.querySelector(".modal-body .gameover");

const scoreDisplay = gameOver.querySelector("p");
const progress = document.querySelector(".quest-num");

const modeBtn = document.querySelector(".prefs .mode");
const skipBtn = document.querySelector(".prefs .skip");

const input = document.querySelector(".input-mode input");
const submitBtn = document.querySelector(".input-mode button");
const resetBtn = document.querySelector(".resetBtn");


var index = 0;
var score = 0;
var mode = 0;

var question = [{
        photo: "download(1).jpg",
        choices: ["Mark Zuckerberg", "Bill Gates", "Larry Page", "Steve Jobs"],
        hint: "The founder of Facebook",
        answer: 0

    },
    {
        photo: "myPh.jpg",
        choices: ["Oliver", "Jack", "Nurudeen", "Ben"],
        hint: "The super genius programmer",
        answer: 2

    },
    {
        photo: "ada.jpg",
        choices: ["Hillary Clinton", "Michelle Obama", "Jenny Mcclian", "Ada Lovelace"],
        hint: "First person to write a computer program",
        answer: 3

    },
    {
        photo: "Aaron.jpg",
        choices: ["Kevin", "Aaron", "babbage", "owens"],
        hint: "Well know internet activist and hacker",
        answer: 1

    },
    {
        photo: ".jpg",
        choices: ["", "", "", ""],
        hint: "",
        answer: 0
    },
    {
        photo: ".jpg",
        choices: ["", "", "", ""],
        hint: "",
        answer: 0

    },
    {
        photo: ".jpg",
        choices: ["", "", "", ""],
        hint: "",
        answer: 0

    },
    {
        photo: ".jpg",
        choices: ["", "", "", ""],
        hint: "",
        answer: 0

    },
    {
        photo: ".jpg",
        choices: ["", "", "", ""],
        hint: "",
        answer: 0

    },
    {
        photo: "download.jpg",
        choices: ["Mark Zuckerberg", "Bill Gates", "Larry Page", "Steve Jobs"],
        hint: "The founder of Facebook",
        answer: 0

    }
];




window.addEventListener("keypress", konami);
options.forEach((element) => {
    element.addEventListener("click", check);
});

submitBtn.addEventListener("click", check);
resetBtn.addEventListener("click", replay);

modeBtn.addEventListener("click", switchMode);

closeModalBtn.addEventListener("click", () => mainModal.style.display = "none");

skipBtn.addEventListener("click", () => {
    if (index < question.length - 1) {
        index++;
        init();
    } else {
        displayScores();
    }
});


function check() {
    let userInput;
    if (mode == 0) {
        userInput = this.textContent;
    } else {
        userInput = input.value.trim();
        input.value = "";
    }
    userInput === question[index].choices[question[index].answer] ? score++ : "";

    if (index < question.length - 1) {
        index++;
        init();
    } else {
        displayScores();
    }

}

function switchMode() {
    if (mode == 0) {
        optionsMode.style.display = "none";
        inputMode.style.display = "block";
        modeBtn.innerText = "Options Mode";
        mode++;
    } else {
        inputMode.style.display = "none";
        optionsMode.style.display = "block";
        modeBtn.innerText = "Direct Mode";
        mode = 0;
    }
}

function replay() {
    score = 0;
    index = 0;
    mode = 0;
    modalHint.style.display = "block";
    gameOver.style.display = "none";
    mainModal.style.display = "none";
    init();
}

function displayScores() {
    scoreDisplay.innerText = `You Scored ${score} out of  ${question.length}`
    modalHint.style.display = "none";
    gameOver.style.display = "block";
    mainModal.style.display = "block";
}

var randQuestion = shuffle(question.slice());

function init() {
    progress.innerText = `Question ${ index + 1} of ${question.length}`;
    console.table(randQuestion);
    let randOptions = shuffle(randQuestion[index].choices.slice());
    image.src = randQuestion[index].photo;
    for (let i = 0; i < options.length; i++) {
        options[i].innerText = randOptions[i];
    }

    hintText.innerText = randQuestion[index].hint;
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.ceil(Math.random() * arr.length - 1);
        let temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}
let luckyWord = "freecodecamp";
let wordArr = [];

function konami(e) {
    wordArr.push(e.key);
    if (wordArr.length > luckyWord.length) {
        wordArr.shift();
    }
    console.log(wordArr);
    if (wordArr.join("").toLowerCase() === luckyWord) {
        console.log("Lucky You");
        hintText.innerText = randQuestion[index].choices[randQuestion[index].answer];
    }
}

init();