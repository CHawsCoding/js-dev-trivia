const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highscoresList = document.getElementById("highscores-list");
const clearHighScoresButton = document.getElementById("clear-highscores-btn");

function populateHighScores() {
  highscoresList.innerHTML = highScores
    .map((score, index) => {
      return `<li>${index + 1}. ${score.initials} - ${score.score}</li>`;
    })
    .join("");
}

populateHighScores();

clearHighScoresButton.addEventListener("click", function () {
  localStorage.removeItem("highScores");
  highscoresList.innerHTML = "";
  console.log("Populating high scores:", highScores);
});
