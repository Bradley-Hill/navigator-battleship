const gameboard = require("../src/gameboard");

test("Does createGameboard return an object", () => {
  expect(typeof gameboard()).toBe("object");
});
