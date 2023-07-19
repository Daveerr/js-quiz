// highscore data from localStorage
function getHighscores() {
  return JSON.parse(window.localStorage.getItem("highscores")) || [];
}

// save score after clicking submit
function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores = getHighscores();
    var newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

// display highscores
function displayHighscores() {
  var highscores = getHighscores();
  var highscoresList = document.getElementById("highscores");
  highscoresList.innerHTML = "";

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;
    highscoresList.appendChild(liTag);
  });
}

displayHighscores();
