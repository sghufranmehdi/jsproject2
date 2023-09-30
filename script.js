const X_Class = "x";
const Circle_CLass = "circle";

const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

startGame();
restartButton.addEventListener("click", startGame);

/// Functions
function startGame() {
  circleTurn = false; // X is the start sign
  cellElement.forEach((cell) => {
    cell.classList.remove(X_Class);
    cell.classList.remove(Circle_CLass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  // 1. place mark
  // 2. Swap turns
  // 3. check for win
  // 4. check for draw

  const cell = e.target;
  const currentClass = circleTurn ? Circle_CLass : X_Class; //selecting currentClass

  // place mark
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    // Swap turns
    swapTurns();

    setBoardHoverClass();
  }
}
function endgame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(X_Class) || cell.classList.contains(Circle_CLass)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
//To find out who's turn it is
function setBoardHoverClass() {
  board.classList.remove(X_Class);
  board.classList.remove(Circle_CLass);

  if (circleTurn) {
    board.classList.add(Circle_CLass);
  } else {
    board.classList.add(X_Class);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
