const gameboard = require("../src/gameboard");

test("Does createGameboard return an object", () => {
  expect(typeof gameboard()).toBe("object");
});

test("The gameboard should be a 2d array of co-ordinates", () => {
  const result = gameboard();
  expect(Array.isArray(result)).toBe(true);
  result.forEach((subArray: [][]) => {
    expect(Array.isArray(subArray)).toBe(true);
  });
});
