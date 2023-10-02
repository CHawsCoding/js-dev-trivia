const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const endScreenElement = document.getElementById("end-screen");
const initialsInputElement = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score-btn");
const timerDisplay = document.getElementById("timer-display");

let shuffledQuestions, currentQuestionIndex;
let correctAnswersCount = 0;
let timerValue = 60;
let timer;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.removeAttribute("hidden");
  setNextQuestion();

  timer = setInterval(function () {
    timerValue--;
    timerDisplay.innerText = `Time left: ${timerValue}s`; // Update the display

    if (timerValue < 10) {
      // Add this block to change text color for urgency
      timerDisplay.style.color = "red";
    } else {
      timerDisplay.style.color = "black";
    }

    if (timerValue <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    if (option === question.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (!correct) {
    timerValue -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    clearInterval(timer);
    endGame();
  }
}

function endGame() {
  questionContainerElement.setAttribute("hidden", true);
  document.getElementById(
    "end-screen"
  ).innerHTML += `<p>Your Score: ${timerValue}</p>`;
  endScreenElement.removeAttribute("hidden");
}

saveScoreButton.addEventListener("click", function () {
  console.log("Button clicked!");
  const initials = initialsInputElement.value.trim();
  console.log("Initials entered:", initials);
  const score = timerValue;

  console.log("Saving score:", initials, score);

  if (initials && initials.length > 0) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });

    highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log("Scores saved:", JSON.parse(localStorage.getItem("highScores")));

  }
});

const highScoresButton = document.getElementById("high-scores-btn");
highScoresButton.addEventListener("click", function () {
  window.location.href = "highscores.html";
});
