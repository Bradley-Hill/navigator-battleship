import { createPlayer } from "../src/player";
global.alert = jest.fn();

test("Expect the createPlayer function to return an object", () => {
  const player = createPlayer(true, false);
  expect(typeof player).toBe("object");
});

test("Expect the player object to have a property isHuman", () => {
  const player = createPlayer(true, false);
  expect(player).toHaveProperty("isHuman", true);
});

test("Expect the player object to have an instance of the gameboard associated", () => {
  const player = createPlayer(false, false);
  expect(player).toHaveProperty("gameboard");
  expect(typeof player.gameboard.receiveAttack).toBe("function");
});

test("Expect the player object to have a property of name", () => {
  const player = createPlayer(false, false);
  expect(player).toHaveProperty("name");
});

test("Expect the player object to have a isMyTurn property", () => {
  const player = createPlayer(true, false);
  expect(player).toHaveProperty("isMyTurn");
});

test("Expect the player object to have a method to make an attack on the other players gameboard", () => {
  const player = createPlayer(true, false);
  expect(player).toHaveProperty("makeHumanMove");
  expect(typeof player.makeHumanMove).toBe("function");
});

test("Expect the makeMove method to correctly submit an attack to the other players gameboard", () => {
  const humanPlayer = createPlayer(true, false);
  const compPlayer = createPlayer(false, false);
  compPlayer.gameboard.createShips(1, 1, 2, "vertical");
  humanPlayer.makeHumanMove(1, 1, compPlayer);
  humanPlayer.makeHumanMove(1, 2, compPlayer);
  expect(compPlayer.gameboard.allShipsSunk()).toBe(true);
});

test("Expect the opponents gameboard to report the missed shots and hit coordinates", () => {
  const humanPlayer = createPlayer(true, false);
  const compPlayer = createPlayer(false, false);
  compPlayer.gameboard.createShips(1, 1, 3, "vertical");
  humanPlayer.makeHumanMove(1, 3, compPlayer);
  humanPlayer.makeHumanMove(1, 6, compPlayer);
  humanPlayer.makeHumanMove(3, 3, compPlayer);
  expect(compPlayer.gameboard.getHitCells()).toEqual([[1, 3]]);
  expect(compPlayer.gameboard.getMissedShots()).toEqual([
    [1, 6],
    [3, 3],
  ]);
});

test("Expect computer player to make a valid random move", () => {
  const humanPlayer = createPlayer(true, false);
  const compPlayer = createPlayer(false, false);
  humanPlayer.gameboard.createShips(1, 1, 3, "vertical");

  compPlayer.makeComputerMove(humanPlayer);

  const missedShots = humanPlayer.gameboard.getMissedShots();
  const hitCells = humanPlayer.gameboard.getHitCells();
  expect(missedShots.length + hitCells.length).toBe(1);
});
