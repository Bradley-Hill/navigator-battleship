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

test("Expect the player object to have a method to make an attack on the other players gameboard", () => {
  const player = createPlayer(true);
  expect(player).toHaveProperty("makeHumanMove");
  expect(typeof player.makeHumanMove).toBe("function");
});

test("Expect the makeMove method to correctly submit an attack to the other players gameboard", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  compPlayer.gameboard.createShips(1, 1, 2, "vertical");
  humanPlayer.makeHumanMove(1, 1, compPlayer);
  humanPlayer.makeHumanMove(1, 2, compPlayer);
  expect(compPlayer.gameboard.allShipsSunk()).toBe(true);
});

test("Expect the opponents gameboard to report the missed shots and hit coordinates", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
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
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  humanPlayer.gameboard.createShips(1, 1, 3, "vertical");

  compPlayer.makeComputerMove(humanPlayer);

  const missedShots = humanPlayer.gameboard.getMissedShots();
  const hitCells = humanPlayer.gameboard.getHitCells();
  expect(missedShots.length + hitCells.length).toBe(1);
});

test("Expect the computer player to make a move adjacent to a confirmed hit", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  humanPlayer.gameboard.createShips(1, 1, 3, "vertical");

  let hit = false;
  let hitCell;
  while (!hit) {
    compPlayer.makeComputerMove(humanPlayer);
    const hitCells = humanPlayer.gameboard.getHitCells();
    hit = hitCells.length > 0;
    if (hit) {
      hitCell = hitCells[0];
    }
  }

  compPlayer.makeComputerMove(humanPlayer);

  const missedShots = humanPlayer.gameboard.getMissedShots();
  const hitCells = humanPlayer.gameboard.getHitCells();

  const lastMove =
    missedShots[missedShots.length - 1] || hitCells[hitCells.length - 1];

  // Check that the last move was adjacent to the hit
  if (hitCell) {
    expect(
      (lastMove[0] === hitCell[0] &&
        (lastMove[1] === hitCell[1] - 1 || lastMove[1] === hitCell[1] + 1)) ||
        (lastMove[1] === hitCell[1] &&
          (lastMove[0] === hitCell[0] - 1 || lastMove[0] === hitCell[0] + 1))
    ).toBe(true);
  }
});

test("Expect the computer to continue making adjacent attacks around a confirmed hit until all valid moves have been exhausted", () => {
  const humanPlayer = createPlayer(true);
  const compPlayer = createPlayer(false);
  humanPlayer.gameboard.createShips(1, 1, 3, "vertical");

  let hit = false;
  let hitCell: number[] = [-1, -1];
  while (!hit) {
    compPlayer.makeComputerMove(humanPlayer);
    const hitCells = humanPlayer.gameboard.getHitCells();
    hit = hitCells.length > 0;
    if (hit) {
      hitCell = hitCells[hitCells.length - 1];
    }
  }
  const movesAfterHit: number[][] = [];
  for (let i = 0; i < 4; i++) {
    compPlayer.makeComputerMove(humanPlayer);
    const hitCells = humanPlayer.gameboard.getHitCells();
    if (hitCells.length > 0) {
      movesAfterHit.push(hitCells[hitCells.length - 1]);
    }
  }

  const adjacentMoves = [
    [hitCell[0], hitCell[1] - 1],
    [hitCell[0], hitCell[1] + 1],
    [hitCell[0] - 1, hitCell[1]],
    [hitCell[0] + 1, hitCell[1]],
  ];
  for (let move of adjacentMoves) {
    const isAdjacent = adjacentMoves.some(
      (adjMove) => adjMove[0] === move[0] && adjMove[1] === move[1]
    );
    expect(isAdjacent).toBe(true);
  }
});
