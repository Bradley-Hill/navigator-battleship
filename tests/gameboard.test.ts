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

test("Expect the receiveAttack method to change the gamboard.grid cell hit property to true", () => {
  const gameboard = createGameboard(5);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.grid[1][1]).toHaveProperty("hit", true);
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
