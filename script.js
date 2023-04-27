const display = document.querySelector("#display");
const gridItem = document.querySelectorAll(".grid-item");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const choiceX = document.querySelector(".choiceX");
const choiceO = document.querySelector(".choiceO");
const winDisplay = document.querySelector(".winDisplay");
let countX = 0;
let countO = 0;
let playerChoice;
const gameBoard = (() => {
  const gameboard = [
    ["x", "o", "x"],
    ["o", "x", "o"],
    ["x", "o", "o"],
  ];
  (function createBoard() {
    gameboard.forEach((e) => {
      e.forEach((i) => {
        let div = document.createElement("div");
        div.classList.add("grid-item");
        div.addEventListener("click", () => {
          if (countO === 0 && countX === 0) {
            if (playerChoice === "X") {
              countX += 1;
            } else {
              countO += 1;
            }
          } else {
            game();
            if (playerChoice === "X") {
              countO -= 1;
            } else {
              countX -= 1;
            }
          }
          console.log(countX, countO);
          div.textContent = playerChoice;
          let cells = document.querySelectorAll(".grid-item");
          if (isVictory(cells)) {
            console.log("hello");
            winDisplay.textContent = `${playerChoice} wins!`;
          }
        });
        display.appendChild(div);
      });
    });
  })();
  choiceX.addEventListener("click", () => {
    displayController.closeModal();
    playerChoice = "X";
  });
  choiceO.addEventListener("click", () => {
    displayController.closeModal();
    playerChoice = "O";
  });
  function game() {
    console.log(playerChoice);
    if (countX > countO) {
      playerChoice = "O";
      countO += 1;
    } else if (countX < countO) {
      playerChoice = "X";
      countX += 1;
    }
    console.log(playerChoice);
    console.log(countX, countO);
    return playerChoice, countO, countX;
  }
  function isVictory(cells) {
    let combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let comb of combs) {
      if (
        cells[comb[0]].textContent === cells[comb[1]].textContent &&
        cells[comb[1]].textContent === cells[comb[2]].textContent &&
        cells[comb[0]].textContent != ""
      ) {
        return true;
      }
    }
    return false;
  }
})();
const displayController = (() => {
  function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
  function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  return { openModal, closeModal };
})();
