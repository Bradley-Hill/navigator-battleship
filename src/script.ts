import { createGameLoop } from "../src/gameLoop";
import { Gameboard } from "./gameboard";

document.addEventListener("DOMContentLoaded", () => {
  const introduction = document.querySelector(".introduction") as HTMLElement;
  const closeButton = document.querySelector("#closeButton");
  const startGameBtn = document.querySelector("#startBtn");
  const difficultySelector = document.querySelector(
    "#difficulty"
  ) as HTMLSelectElement;
  const opponentBoard = document.querySelector(".opponentBoard");
  const playersBoard = document.querySelector(".playersBoard");

  let gameLoop = createGameLoop(false);

  if (introduction && closeButton) {
    introduction.style.display = "flex";
    closeButton.addEventListener("click", () => {
      introduction.style.display = "none";
    });
  }

  if (opponentBoard instanceof HTMLElement) {
    createGrid(gameLoop.humanPlayer.gameboard, opponentBoard, "opponentBoard");
  } else {
    console.error("Opponent board not found");
  }
  if (playersBoard instanceof HTMLElement) {
    createGrid(gameLoop.humanPlayer.gameboard, playersBoard, "playersBoard");
  } else {
    console.error("Players board not found");
  }

  if (startGameBtn && difficultySelector) {
    startGameBtn.addEventListener("click", () => {
      difficultySelector.disabled = true;
      let isHardDifficulty = difficultySelector.value === "Hard";
      gameLoop = createGameLoop(isHardDifficulty);
      gameLoop.startGame();

      if (opponentBoard instanceof HTMLElement) {
        createGrid(
          gameLoop.humanPlayer.gameboard,
          opponentBoard,
          "opponentBoard"
        );
      } else {
        console.error("Opponent board not found");
      }
      if (playersBoard instanceof HTMLElement) {
        createGrid(
          gameLoop.humanPlayer.gameboard,
          playersBoard,
          "playersBoard"
        );
      } else {
        console.error("Players board not found");
      }

      gameLoop.manageTurns();
    });
  } else {
    console.error("Start Game button or difficulty selector not found");
  }

  function createGrid(
    gameboard: Gameboard,
    htmlGrid: HTMLElement,
    boardClass: string
  ) {
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
        if (boardClass === "opponentBoard") {
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
        }
        htmlGrid.appendChild(cell);
      }
    }
    if (boardClass === "playersBoard") {
      updateShipCells("playersBoard", gameLoop.humanPlayer.gameboard);
    }
  }

  function updateElementTextContent(elementId: string, moves: number[][]) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = moves
        .map((move) => `(${move[0]}, ${move[1]})`)
        .join(", ");
    }
  }

  function updateShipCells(boardClass: string, gameboard: Gameboard) {
    for (let x = 0; x < gameboard.size; x++) {
      for (let y = 0; y < gameboard.size; y++) {
        if (gameboard.grid[x][y].ship !== null) {
          const cell = document.querySelector(
            `.${boardClass} .cell[data-x="${x}"][data-y="${y}"]`
          );
          if (cell) {
            cell.classList.add("ship");
          }
        }
      }
    }
  }

  function updateCellClasses(
    boardClass: string,
    moves: number[][],
    className: string
  ) {
    moves.forEach((move) => {
      const cell = document.querySelector(
        `.${boardClass} .cell[data-x='${move[0]}'][data-y='${move[1]}']`
      );
      if (cell) {
        cell.classList.add(className);
      }
    });
  }

  function updateMoveLists() {
    updateElementTextContent(
      "humanMissedAttacks",
      gameLoop.humanPlayer.gameboard.missedAttacks
    );
    updateElementTextContent(
      "computerMissedAttacks",
      gameLoop.compPlayer.gameboard.missedAttacks
    );
    updateElementTextContent(
      "humanHitCells",
      gameLoop.humanPlayer.gameboard.getHitCells()
    );
    updateElementTextContent(
      "computerHitCells",
      gameLoop.compPlayer.gameboard.getHitCells()
    );

    updateCellClasses(
      "opponentBoard",
      gameLoop.compPlayer.gameboard.missedAttacks,
      "missedAttacks"
    );
    updateCellClasses(
      "playersBoard",
      gameLoop.humanPlayer.gameboard.missedAttacks,
      "missedAttacks"
    );
    updateCellClasses(
      "opponentBoard",
      gameLoop.compPlayer.gameboard.getHitCells(),
      "hits"
    );
    updateCellClasses(
      "playersBoard",
      gameLoop.humanPlayer.gameboard.getHitCells(),
      "hits"
    );
  }
});
