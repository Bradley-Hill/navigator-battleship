import { Gameboard } from "../src/gameboard";
import { createGameLoop } from "../src/gameLoop";
global.alert = jest.fn();

test("Expect the gameLoop to create a human player and computer player,with gameBoards", () => {
  const gameLoop = createGameLoop(false);
  expect(gameLoop.humanPlayer).toBeDefined();
  expect(gameLoop.compPlayer).toBeDefined();
  expect(gameLoop.humanPlayer.isHuman).toBe(true);
  expect(gameLoop.compPlayer.isHuman).toBe(false);
  expect(gameLoop.humanPlayer.gameboard).toBeDefined();
  expect(gameLoop.compPlayer.gameboard).toBeDefined();
});

test("Expect the gameLoop to place 5 ships on each gameboard", () => {
  const gameLoop = createGameLoop(false);
  gameLoop.startGame();

  const humanPlayerGameboard = gameLoop.humanPlayer.gameboard;
  const compPlayerGameboard = gameLoop.compPlayer.gameboard;

  const countUniqueShips = (gameboard: Gameboard) => {
    const shipsSet = new Set();
    gameboard.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.ship !== null) {
          shipsSet.add(cell.ship);
        }
      });
    });
    return shipsSet.size;
  };

  expect(countUniqueShips(humanPlayerGameboard)).toBe(5);
  expect(countUniqueShips(compPlayerGameboard)).toBe(5);
});

test("Expect checkEndOfGame to correctly set gameOver to true", () => {
  const gameLoop = createGameLoop(false);
  gameLoop.startGame();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      gameLoop.humanPlayer.gameboard.receiveAttack(i, j);
    }
  }

  gameLoop.checkEndOfGame();
  expect(gameLoop.gameOver).toBe(true);
});

test("Expect gameOver to be false after createGameLoop is called", () => {
  const gameLoop = createGameLoop(false);
  expect(gameLoop.gameOver).toBe(false);
});
