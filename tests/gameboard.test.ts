import { createGameboard, Cell } from "../src/gameboard";

test("Does createGameboard return an object", () => {
  const gameboard = createGameboard(5);
  expect(typeof gameboard).toBe("object");
});

test("The gameboard.grid should be a 2d array of co-ordinates", () => {
  const gameboard = createGameboard(5);
  expect(gameboard).toHaveProperty("grid");
  expect(Array.isArray(gameboard.grid)).toBe(true);
  gameboard.grid.forEach((subArray: Cell[]) => {
    expect(Array.isArray(subArray)).toBe(true);
  });
});

test("Each cell of the gameboard contains the appropriate object", () => {
  const result = createGameboard(5);
  result.grid.forEach((row: Cell[]) => {
    row.forEach((cell: Cell) => {
      expect(typeof cell).toBe("object");
      expect(cell).toHaveProperty("occupied", false);
      expect(cell).toHaveProperty("hit", false);
    });
  });
});

test("Expect the gameboard to have a method for calling the createShips function", () => {
  const result = createGameboard(5);
  expect(result).toHaveProperty("createShips");
  expect(typeof result.createShips).toBe("function");
});

test("Ship should register its position when placed on the gameboard", () => {
  const gameboard = createGameboard(5);
  gameboard.createShips(0, 0, 3, "horizontal");
  const ship = gameboard.grid[0][0].ship;
  expect(ship).not.toBeNull();
  if (ship) {
    expect(ship.position).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  }
});

test("Ship should not be placed outside the bounds of the gameboard", () => {
  const gameboard = createGameboard(5);
  const shipCreated = gameboard.createShips(4, 4, 3, "horizontal");
  expect(shipCreated).toBe(null);
});

test("Ships should not be able to overlap on the gameboard.grid", () => {
  const gameboard = createGameboard(9);
  const firstShip = gameboard.createShips(4, 5, 3, "horizontal");
  const secondShip = gameboard.createShips(4, 4, 3, "vertical");
  expect(firstShip).toBe(firstShip);
  expect(secondShip).toBe(null);
});

test("Expect the gameboard to have a method for receiving an attack", () => {
  const result = createGameboard(5);
  expect(result).toHaveProperty("receiveAttack");
  expect(typeof result.createShips).toBe("function");
});

test("Expect the receiveAttack method to take two numbers as arguments", () => {
  const gameboard = createGameboard(5);
  const receiveAttack = gameboard.receiveAttack;

  gameboard.receiveAttack = jest.fn(receiveAttack);
  gameboard.receiveAttack(1, 2);
  expect(gameboard.receiveAttack).toHaveBeenCalledWith(
    expect.any(Number),
    expect.any(Number)
  );
});

test("Expect a ship at the coordinates of receiveAttack method to have its isHit method called", () => {
  const gameboard = createGameboard(5);
  const ship = gameboard.createShips(1, 1, 2, "vertical");
  if (ship) {
    gameboard.receiveAttack(1, 1);
    expect(ship.impacts).toBe(1);
  } else {
    throw new Error("Ship could not be created");
  }
});

test("Expect a receiveAttack that does not hit a ship to be recorded as a missed attack", () => {
  const gameboard = createGameboard(9);
  gameboard.createShips(1, 1, 2, "horizontal");
  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(5, 5);
  expect(gameboard.missedAttacks).toContainEqual([3, 3]);
  expect(gameboard.missedAttacks).toContainEqual([5, 5]);
});

test("Expect gameboard to have method that checks if all ships have been sunk", () => {
  const gameboard = createGameboard(9);
  expect(typeof gameboard.allShipsSunk).toBe("function");
});

test("Expect allShipsSunk method to return false if there are ships that have not sunk on the gameboard", () => {
  const gameboard = createGameboard(9);
  gameboard.createShips(1, 1, 2, "vertical");
  gameboard.createShips(8, 8, 1, "vertical");
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  const allShipsSunk = gameboard.allShipsSunk();
  expect(allShipsSunk).toBe(false);
});

test("Expect allShipsSunk to return true if all ships on gameboard have sunk", () => {
  const gameboard = createGameboard(9);
  gameboard.createShips(1, 1, 2, "vertical");
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  const allShipsSunk = gameboard.allShipsSunk();
  expect(allShipsSunk).toBe(true);
});
