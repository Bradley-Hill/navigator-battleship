import { createGameLoop } from "../src/gameLoop";
import { Gameboard } from "./gameboard";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.querySelector("#startBtn");
  const opponentBoard = document.querySelector(".opponentBoard");
  const playersBoard = document.querySelector(".playersBoard");

  const gameLoop = createGameLoop();

  if (opponentBoard instanceof HTMLElement) {
    createGrid(gameLoop.humanPlayer.gameboard, opponentBoard);
  } else {
    console.error("Opponent board not found");
  }
  if (playersBoard instanceof HTMLElement) {
    createGrid(gameLoop.humanPlayer.gameboard, playersBoard);
  } else {
    console.error("Players board not found");
  }

  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      gameLoop.startGame();
    });
  } else {
    console.error("Start Game button not found");
  }

  function createGrid(gameboard: Gameboard, htmlGrid: HTMLElement) {
    htmlGrid.innerHTML = "";
    htmlGrid.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`;
    htmlGrid.style.gridTemplateRows = `repeat(${gameboard.size}, 1fr)`;
    const root = document.documentElement;
    root.style.setProperty("--num", gameboard.size.toString());
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i.toString();
        cell.dataset.y = j.toString();
        htmlGrid.appendChild(cell);
      }
    }
  }

  function updateMoveLists() {
    const humanMissedAttacksElement =
      document.getElementById("humanMissedAttacks");
    const computerMissedAttacksElement = document.getElementById(
      "computerMissedAttacks"
    );
    const humanHitCellsElement = document.getElementById("humanHitCells");
    const computerHitCellsElement = document.getElementById("computerHitCells");

    if (humanMissedAttacksElement) {
      humanMissedAttacksElement.textContent =
        gameLoop.humanPlayer.gameboard.missedAttacks
          .map((move) => `(${move[0]}, ${move[1]})`)
          .join(", ");
    }
    if (computerMissedAttacksElement) {
      computerMissedAttacksElement.textContent =
        gameLoop.compPlayer.gameboard.missedAttacks
          .map((move) => `(${move[0]}, ${move[1]})`)
          .join(", ");
    }

    if (humanHitCellsElement) {
      humanHitCellsElement.textContent = gameLoop.humanPlayer.gameboard
        .getHitCells()
        .map((move) => `(${move[0]}, ${move[1]})`)
        .join(", ");
    }
    if (computerHitCellsElement) {
      computerHitCellsElement.textContent = gameLoop.compPlayer.gameboard
        .getHitCells()
        .map((move) => `(${move[0]}, ${move[1]})`)
        .join(", ");
    }

    gameLoop.humanPlayer.gameboard.missedAttacks.forEach((move) => {
      const cell = document.querySelector(
        `.opponentBoard .cell[data-x='${move[0]}'][data-y='${move[1]}']`
      );
      if (cell) {
        cell.classList.add("missedAttacks");
      }
    });

    gameLoop.compPlayer.gameboard.missedAttacks.forEach((move) => {
      const cell = document.querySelector(
        `.playersBoard .cell[data-x='${move[0]}'][data-y='${move[1]}']`
      );
      if (cell) {
        cell.classList.add("missedAttacks");
      }
    });
  }
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.x && target.dataset.y) {
        const x = parseInt(target.dataset.x, 10);
        const y = parseInt(target.dataset.y, 10);
        gameLoop.manageTurns(x, y);
        updateMoveLists();
      } else {
        console.error("Data attributes x and y are not set");
      }
    });
  });
});
