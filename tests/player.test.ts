import { createPlayer } from "../src/player";

test("Expect the createPlayer function to return an object", () => {
  const player = createPlayer();
  expect(typeof player).toBe("object");
});

test("Expect the player object to have a property isHuman", () => {
  const player = createPlayer();
  expect(player).toHaveProperty("isHuman", true);
});
