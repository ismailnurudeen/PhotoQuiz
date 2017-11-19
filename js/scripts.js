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
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7WBYec2CSW87NDk-Hi7XGkhkRvtcII-LFyWCEkoPYIIC_Hgz", 
        choices: ["Linus Torvalds", "Bill Gates", "Alan Turing", "Steve Jobs"],
        hint: "Invent Linux OS and Git",
        answer: 0

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2oA5Ofq2XixOYpfREoeNVMEsng44MaiURBV78z3cgXHifweH4Q",
        choices: ["Oliver Queen", "John Backus", "Denis Ritchie", "Ken Thompson"],
        hint: "Invented the unix OS",
        answer: 2

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIBEIg2bQez8SJt0D1Z8UNRueI6-teZAzEmk-6hhg-nzO7MbZ",
        choices: ["Hillary Clinton", "Michelle Obama", "Jenny Mcclian", "Ada Lovelace"],
        hint: "First person to write a computer program",
        answer: 3

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaQwrRD5VUA4nYpSiEMFVaVSq9mDEGr_huDzCv3ZsDk3vGSIB",
        choices: ["Kevin Mitnick", "Bill Gates", "Charles Babbage", "Paul Allen"],
      hint:"Founded Microsoft inc.", 
        answer: 1

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJau4kpLdHLJSUxJW9USjDaTLb5SB0U7RrJ8C3vyAUCet6zIgjg",
        choices: ["Steve Wozniak", "Brian Kernighan", "John George Kemeny", "James Gosling"],
        hint: "Invented The Java Programing Language",
        answer: 3
    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyAEpuwRoVVer3_FES8ayKLyn6yrNdMAwk71xzG61Ez5A6aEg",
        choices: ["Thomas Eugene Kurtz", "Tim Berners-Lee", "Alan Curtis Kay", "Niklaus Wirth"],
        hint: "Invented the World Wide Web",
        answer: 1
    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq1iRyK_ACAV-7mEP2COWl8aIVQPca--Nchps8a_MCy-rwHKqR",
        choices: ["Thomas Edison", "Larry Wall", "Guido van Rossum", "Brendan Eich"],
        hint: "Invented Python Programming Language",
        answer: 2

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHq3nVq5ojFjrs_HhIWYekbEYwL54Yt8hs1TP2EkVcrQyXda_",
        choices: ["Niklaus Wirth", "Tim Cook", "Steve Wozniak", "Paul Allen"],
        hint: "CEO of Apple inc.",
        answer: 1

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36nejGA0DXryr9uWauxz7yL2t8rAAXWP0vGSoeu1rMEA3fq8uCw",
        choices: ["Larry Page", "Segrey Brin", "Sundar Pichai", "Travis Kalanick"],
        hint: "Co-founder of Google inc.",
        answer: 0

    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RB0WyTr8Z2mJzAJH0YbSm0NtXnOyEb7C4kjHQHUIAmvY1FUWSw",
        choices: ["Mark Zuckerberg", "Satya Nadella", "Evan Spiegel", "Reed Hastings"],
        hint: "The founder of Facebook",
        answer: 0

    },  
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-QCWbGLeTz5aFjddUBJGSKSOAW-H-JgLOHDomvFnS81ay6G5cQ",  
      choices: ["Micheal Dell", "Logan Green", "Reid Hoffman", "Travis Kalanick"],      
      hint: "CEO and Founder of Dell inc.",    
      answer: 0    
    },
    {      
     photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQno3tc8FMvmtUEI2Eo3KdfQJ0sBts39lBBwbaohTU9UH6mzq8s",     
   choices: ["Pierre Omidyar", "James Park", "Jack Ma","John George Kemeny"],      
     hint: "Founder of Ebay",        
     answer: 0    
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QFEhPI8v-8Q8jWC1roUhsQT02lpPlUZVUhY-AKKm81MYI8tk",       
   choices: ["Larry Ellison", "Satya Nadella", "Martin Cooper", "Jeff Bezos"],        
    hint: "founder of Oracle inc.",           answer: 0   
    }, 
    {        
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXSYEpG47gO4ZbpCJYpo_ESnbwCS543ir75ewsu9JDqeJj3hlm",       
       choices: ["Jeff Bezos", "Elon Musk", "Bobby Murphy", "Larry Page"],       
        hint: "Founder and CEO of Amazon inc.",       
        answer: 0   
      },    
     { 
       photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPem9-UGPniWYVHqHTQxECaoVFJSh2PTpXFJ1BmrHAb80bMAV5w",        choices: ["Merissa Mayers", "Whitney Wolfe", "Ginni Rometty", "Ada Lovelace"],       
     hint: "CEO of Yahoo inc.",       
     answer: 0    },
       {   
       photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK6db2HNOZujRd6PQ3stDl3TZe2ldflSR7PinMBLOSw8blFKi1g",   
     choices: ["Virginia Rometty", "Ginni Rometty", "Merissa Mayers", "Meg Whitman"],      
         hint: "CEO of IBM",   
         answer: 0    
       },      
       {       
         photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7JA60I_c_7b2E1x4fO3E3gqRU3RGVJ7ObbTgonDka3lNEn3Rh",        
         choices: ["Jack Dorsey", "Sergey Brin", "Brian Chesky", "Sundar Pichai "],       
         hint: "CEO and Co-creator of Twitter",       
         answer: 0  
       }, 
     {  
       photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpZeugLA6aORT0coEFiSyaO-eZ3uZexX9VaTcGa88woANKoVIc",       
       choices: ["Stewart Butterfield", "Bill Gates", "Marc Benioff", "Steve Jobs"],       
       hint: "The co-founder of  Apple inc.",       
       answer: 3   
     } , 
   {
     photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7OMseBDf1X4vSALaKJXRJZvMVO1N7dvXEC1psuxbnaADuFUs8Tw",       
     choices: ["John McCarthy", "Niklaus Wirth", "Alan Turing", "Guido van Rossum"],        
     hint:"Inventor Lisp Programming Language",       
     answer: 0
   },              
  { 
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbTmlMdhjHhKTM-VXedNL7f18Rw50lgIzbx9TVZyt5HWcLkl7",        choices: ["Grace Hopper", "Susan Wojcicki", "Meg Whitman", "Marissa Mayer"],     
    hint: "Inventor of the first Compiler",        answer: 0   
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

var randQuestion = shuffle(question.slice());

function check() {
    let userInput;
    if (mode == 0) {
        userInput = this.textContent;
    } else {
        userInput = input.value.trim();
        input.value = "";
    }
    userInput === randQuestion[index].choices[randQuestion[index].answer] ? score++ : "";
 console.log(userInput);
  console.log(randQuestion[index].choices[randQuestion[index].answer]);
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

function init() {
    progress.innerText = `Question ${ index + 1} of ${question.length}`;
    console.table(randQuestion);
  console.log(index);
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
