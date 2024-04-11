import { createGameLoop } from "../src/gameLoop";

test("Expect the gameLoop to create a human player and computer player,with gameBoards", () => {
  const gameLoop = createGameLoop();
  expect(gameLoop.humanPlayer).toBeDefined();
  expect(gameLoop.compPlayer).toBeDefined();
  expect(gameLoop.humanPlayer.isHuman).toBe(true);
  expect(gameLoop.compPlayer.isHuman).toBe(false);
  expect(gameLoop.humanPlayer.gameboard).toBeDefined();
  expect(gameLoop.compPlayer.gameboard).toBeDefined();
});

test("Expect the gameLoop to place 5 ships on each gameboard", () => {
  const gameLoop = createGameLoop();
  gameLoop.startGame();
});

test("Expect checkEndOfGame to correctly set gameOver to true", () => {
  const gameLoop = createGameLoop();
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
  const gameLoop = createGameLoop();
  expect(gameLoop.gameOver).toBe(false);
});
