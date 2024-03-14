const ship = require("../src/ship");

test("Expect the factory function to return an object", () => {
  expect(typeof ship()).toBe("object");
});

test("The ship objects should have the length, impacts and sunk properties", () => {
  expect(ship()).toHaveProperty("length");
  expect(ship()).toHaveProperty("impacts");
  expect(ship()).toHaveProperty("sunk");
});
