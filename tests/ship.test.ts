const ship = require("../src/ship");

test("Expect the factory function to return an object", () => {
  expect(typeof ship()).toBe("object");
});

test("The ship objects should have the length, impacts and sunk properties", () => {
  expect(ship()).toHaveProperty("length");
  expect(ship()).toHaveProperty("impacts");
  expect(ship()).toHaveProperty("sunk");
});

test("The ship object has a hit() which increments the impacts prop", () => {
  let testShip = ship();
  testShip.hit();
  expect(testShip.impacts).toBe(1);
});

test("The ship prop sunk changes to true when the impacts value is equal to/greater than the length value", () => {
  let testShip = ship({ length: 2 });
  testShip.hit();
  testShip.hit();
  testShip.isSunk();
  expect(testShip.sunk).toBe(true);
});
