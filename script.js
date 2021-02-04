document.addEventListener("DOMContentLoaded", startGame);

const playerHand = document.querySelector("#player1");
const computerHand = document.querySelector("#player2");

const gameScreens = document.querySelectorAll("#texts div");
const gameButtons = document.querySelectorAll("#buttons button");

const gameButtonContainer = document.querySelector("#buttons");

let playerChoice;
let computerChoice;
let gameResult;

function startGame() {
  console.log("startGame");

  awaitPlayerChoice();
}

function awaitPlayerChoice() {
  console.log("awaitPlayerChoice");

  gameButtons.forEach((gameButton) => {
    gameButton.addEventListener("click", savePlayerChoice);
  });
}

function savePlayerChoice() {
  console.log("savePlayerChoice");

  gameButtons.forEach((gameButton) => {
    gameButton.removeEventListener("click", savePlayerChoice);
  });

  playerChoice = this.dataset.playerChoice;

  console.log(`The player has chosen ${this.dataset.playerChoice}`);

  getRandomComputerChoice();
}

function getRandomComputerChoice() {
  console.log("getRandomComputerChoice");

  const computerChoices = document.querySelectorAll("button[data-player-choice]");

  computerChoice = computerChoices[Math.floor(Math.random() * Math.floor(3))].dataset.playerChoice;
  console.log(`The computer randomly chose ${computerChoice}`);

  showAnimations();
}

function showAnimations() {
  console.log("showAnimations");

  gameButtonContainer.classList.add("disabled");

  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  computerHand.addEventListener("animationend", function () {
    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");
    playerHand.classList.add(playerChoice);
    computerHand.classList.add(computerChoice);

    findWinner();
  });
}

function findWinner() {
  console.log("findWinner");

  if (playerChoice === computerChoice) {
    gameResult = "draw";
  } else if ((playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" && computerChoice === "rock")) {
    gameResult = "win";
  } else {
    gameResult = "lose";
  }

  showGameResult();
}

function showGameResult() {
  console.log("showGameResult");

  document.querySelector(`#${gameResult}`).classList.remove("hidden");

  setTimeout(resetGame, 2000);
}

function resetGame() {
  console.log("resetGame");

  gameScreens.forEach((gameScreen) => {
    gameScreen.classList.add("hidden");
  });

  playerHand.className = "player";
  computerHand.className = "player";

  gameButtonContainer.classList.remove("disabled");

  startGame();
}
