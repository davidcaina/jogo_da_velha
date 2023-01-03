const X_PLAYER = "x";
const CIRCLE_PLAYER = "circle";

const vitorias = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const mensagemDeVitoria = document.querySelector("[texto-mensagem-de-vitoria]");

const restartBtn = document.getElementById("restart");

const mensagemDeVitoriaElement = document.getElementById("telaVitoria");
const tabuleiro = document.getElementById("tabuleiro");

let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_PLAYER);
    cell.classList.remove(CIRCLE_PLAYER);
    cell.removeEventListener("click", handleClickFunction);
    cell.addEventListener("click", handleClickFunction, { once: true });
  });
  changeBoard();
  mensagemDeVitoriaElement.classList.remove("show");
}

function handleClickFunction(event) {
  const cell = event.target;
  const currentPlayer = circleTurn ? CIRCLE_PLAYER : X_PLAYER;

  handlePlay(cell, currentPlayer);

  if (winFunction(currentPlayer)) {
    endFunction(false);
  } else if (drawFunction()) {
    endFunction(true);
  } else {
    changePlayer();
    changeBoard();
  }
}

function handlePlay(cell, currentPlayer) {
  cell.classList.add(currentPlayer);
}

function changePlayer() {
  circleTurn = !circleTurn;
}

function changeBoard() {
  tabuleiro.classList.remove(X_PLAYER);
  tabuleiro.classList.remove(CIRCLE_PLAYER);
  if (circleTurn) {
    tabuleiro.classList.add(CIRCLE_PLAYER);
  } else {
    tabuleiro.classList.add(X_PLAYER);
  }
}

function winFunction(currentPlayer) {
  return vitorias.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

function drawFunction() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_PLAYER) ||
      cell.classList.contains(CIRCLE_PLAYER)
    );
  });
}

function endFunction(draw) {
  if (draw) {
    mensagemDeVitoria.innerText = `Empatou!`;
  } else {
    mensagemDeVitoria.innerText = `${circleTurn ? "Circulo" : "'X'"} Ganhou!`;
  }
  mensagemDeVitoriaElement.classList.add("show");
}
