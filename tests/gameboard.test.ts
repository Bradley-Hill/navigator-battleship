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
      expect(cell).toHaveProperty("occupied");
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
  expect(shipCreated).toBe(false);
});
