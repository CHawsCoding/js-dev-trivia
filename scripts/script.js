const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const endScreenElement = document.getElementById("end-screen");
const initialsInputElement = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score-btn");

let currentQuestionIndex;
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
  endScreenElement.removeAttribute("hidden");
}

saveScoreButton.addEventListener("click", function () {
  const initials = initialsInputElement.value;
  const score = timerValue;

  console.log(initials, score);
});
