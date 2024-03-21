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
