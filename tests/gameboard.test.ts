import { Cell } from "../src/gameboard";

const gameboard = require("../src/gameboard");

test("Does createGameboard return an object", () => {
  expect(typeof gameboard()).toBe("object");
});

test("The gameboard.grid should be a 2d array of co-ordinates", () => {
  const result = gameboard();
  expect(result).toHaveProperty("grid");
  expect(Array.isArray(result.grid)).toBe(true);
  result.grid.forEach((subArray: [][]) => {
    expect(Array.isArray(subArray)).toBe(true);
  });
});

test("Each cell of the gameboard contains the appropriate object", () => {
  const result = gameboard();
  result.grid.forEach((row: Cell[]) => {
    row.forEach((cell: Cell) => {
      expect(typeof cell).toBe("object");
      expect(cell).toHaveProperty("occupied");
      expect(cell).toHaveProperty("hit", false);
    });
  });
});

test("Expect the gameboard to have a method for calling the createShips function", () => {
  const result = gameboard();
  expect(result).toHaveProperty("createShips");
  expect(typeof result.createShips).toBe("function");
});
