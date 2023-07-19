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

// quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Event listener for the "Start Quiz" button click
startBtn.addEventListener("click", function () {
  quizStart();
});

// Function to start the quiz
function quizStart() {
  var startScreenEl = document.querySelector(".container"); // Correct class name here
  startScreenEl.classList.add("hide");

  var questionsSectionEl = document.getElementById("questions"); // Use getElementById for ID selection
  questionsSectionEl.classList.remove("hide");

  // Starts the timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  // Display the question
  getQuestion();
}

// Function to handle the timer tick
function clockTick() {
  time--;

  if (time <= 0) {
    clearInterval(timerId); // Stop the timer
  } else {
    timerEl.textContent = time; // Update the timer display
  }
}

// loop thru array of questions and answers

function getQuestion() {
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
  });
}
// function to handle when a question option is clicked
function questionClick(event) {
  var selectedOption = event.target.value;
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
    time -= 10;
  }

  // display the feedback
  feedbackEl.classList.remove("hide");
  setTimeout(function () {
    feedbackEl.classList.add("hide");
  }, 1000);

  // move to the next question
  currentQuestionIndex++;

  // check if the quiz is finished
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
