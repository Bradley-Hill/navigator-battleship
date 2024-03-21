import { createPlayer } from "../src/player";

test("Expect the createPlayer function to return an object", () => {
  const player = createPlayer(true);
  expect(typeof player).toBe("object");
});

test("Expect the player object to have a property isHuman", () => {
  const player = createPlayer(true);
  expect(player).toHaveProperty("isHuman", true);
});

test("Expect the player object to have an instance of the gameboard associated", () => {
  const player = createPlayer(false);
  expect(player).toHaveProperty("gameboard");
  expect(typeof player.gameboard.receiveAttack).toBe("function");
});

test("Expect the player object to have a property of name", () => {
  const player = createPlayer(false);
  expect(player).toHaveProperty("name");
});

test("Expect the player object to have a isMyTurn property", () => {
  const player = createPlayer(true);
  expect(player).toHaveProperty("isMyTurn");
});

test("Expect teh player object to have a method to make an attack on the other players gameboard", () => {
  const player = createPlayer(true);
  expect(player).toHaveProperty("makeMove");
  expect(typeof player.makeMove).toBe("function");
});

test("Expect the makeMove method to correctly submit an attack to the other players gameboard", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  compPlayer.gameboard.createShips(1, 1, 2, "vertical");
  humanPlayer.makeMove(1, 1, compPlayer);
  humanPlayer.makeMove(1, 2, compPlayer);
  expect(compPlayer.gameboard.allShipsSunk()).toBe(true);
});

test("Expect the opponents gameboard to report the missed shots and hit coordinates", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  compPlayer.gameboard.createShips(1, 1, 3, "vertical");
  humanPlayer.makeMove(1, 3, compPlayer);
  humanPlayer.makeMove(1, 6, compPlayer);
  humanPlayer.makeMove(3, 3, compPlayer);
  expect(compPlayer.gameboard.getHitCells()).toEqual([[1, 3]]);
  expect(compPlayer.gameboard.getMissedShots()).toEqual([
    [1, 6],
    [3, 3],
  ]);
});
