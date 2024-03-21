import { createGameboard } from "../src/gameboard";

interface Player {
  isHuman: boolean;
}

export function createPlayer(): Player {
  return {
    isHuman: true,
  };
}
