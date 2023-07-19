// questions and answers
var questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyperlinks and Text Markup Language",
      "HyperWeb and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "Inside which HTML element do we put the Javascript?",
    answer: "script",
    options: ["js", "scripting", "script", "javascript"],
  },
  {
    numb: 4,
    question: "Which property is used to change the background color in CSS?",
    answer: "background-color",
    options: ["bg", "color-background", "bgcolor", "background-color"],
  },
  {
    numb: 5,
    question: "Javascript is the same as java?",
    answer: "False",
    options: ["True", "False", "45", "Neither"],
  },

  {
    numb: 6,
    question: "Which property is used to change the font of an element?",
    answer: "font-style",
    options: ["font-family", "font-weight", "font-change", "font-style"],
  },
  {
    numb: 7,
    question: "Commonly used data types DO NOT include?",
    answer: "alerts",
    options: ["strings", "alerts", "booleans", "numbers"],
  },
  {
    numb: 8,
    question: "Arrays in JavaScript can be used to store?",
    answer: "all of the above",
    options: [
      "booleans",
      "other arrays",
      "numbers and strings",
      "all of the above",
    ],
  },
  {
    numb: 9,
    question:
      "String values must be enclosed within __ when being assigned to variables?",
    answer: "parenthesis",
    options: ["commas", "curly brackets", "qoutes", "parenthesis"],
  },
  {
    numb: 10,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is?",
    answer: "console.log",
    options: ["terminal or bash", "console.log", "for loops", "Javascript"],
  },
];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var viewHighScoresBtn = document.querySelector("#high-scores-btn");

// quiz initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// start quiz and hide frontpage

function quizStart() {
  var startScreenEl = document.querySelector(".container");
  startScreenEl.classList.add("hide");

  var questionsSectionEl = document.getElementById("questions");
  questionsSectionEl.classList.remove("hide");

  // starts the timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  displayQuestion();
}

// function to display question
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words");
  promptEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
    choiceBtn.classList.add("options-btn");
  });
}

// check for right answers

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    displayQuestion();
  }
}

// end quiz

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// end quiz if timer reaches 0

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// save score in local storage

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}
nameEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscore;
startBtn.onclick = quizStart;

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
    var queryString = new URLSearchParams({ name: nameEl.value, score: time });
    window.location.href = "highscore.html?" + queryString.toString();
  }
}
