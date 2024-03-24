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

test("Expect the gameLoop to place 3 ships on each gameboard", () => {
  const gameLoop = createGameLoop();
  gameLoop.startGame();

  expect(gameLoop.humanPlayer.gameboard.grid[0][0].ship).not.toBeNull();
  expect(gameLoop.humanPlayer.gameboard.grid[0][1].ship).not.toBeNull();
  expect(gameLoop.humanPlayer.gameboard.grid[0][2].ship).not.toBeNull();

  expect(gameLoop.compPlayer.gameboard.grid[0][0].ship).not.toBeNull();
  expect(gameLoop.compPlayer.gameboard.grid[0][1].ship).not.toBeNull();
  expect(gameLoop.compPlayer.gameboard.grid[0][2].ship).not.toBeNull();
});