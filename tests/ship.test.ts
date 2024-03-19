import { createShip } from "../src/ship";

test("Expect the factory function to return an object", () => {
  expect(typeof createShip()).toBe("object");
});

test("The ship objects should have the length, impacts and sunk properties", () => {
  expect(createShip()).toHaveProperty("length");
  expect(createShip()).toHaveProperty("impacts");
  expect(createShip()).toHaveProperty("sunk");
});

test("The ship object has a hit() which increments the impacts prop", () => {
  let testShip = createShip();
  testShip.hit();
  expect(testShip.impacts).toBe(1);
});

test("The ship prop sunk changes to true when the impacts value is equal to/greater than the length value", () => {
  let testShip = createShip();
  testShip.hit();
  testShip.hit();
  testShip.isSunk();
  expect(testShip.sunk).toBe(true);
});
