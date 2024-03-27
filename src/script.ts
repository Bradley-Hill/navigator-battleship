import { createGameLoop } from "../src/gameLoop";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.querySelector("#startBtn");
  const opponentBoard = document.querySelector(".opponentBoard");
  const playersBoard = document.querySelector(".playersBoard");

  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      const gameLoop = createGameLoop();
      gameLoop.startGame();
    });
  } else {
    console.error("Start Game button not found");
  }
});
