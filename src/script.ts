import { createGameLoop } from "../src/gameLoop";
import { Gameboard } from "./gameboard";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.querySelector("#startBtn");
  const opponentBoard = document.querySelector(".opponentBoard");
  const playersBoard = document.querySelector(".playersBoard");

  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      const gameLoop = createGameLoop();
      gameLoop.startGame();
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
        htmlGrid.appendChild(cell);
      }
    }
  }
});
