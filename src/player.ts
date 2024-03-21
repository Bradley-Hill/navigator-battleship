import { createGameboard, Gameboard } from "../src/gameboard";

interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
}

export function createPlayer(): Player {
  return {
    isHuman: true,
    gameboard: createGameboard(10),
  };
}
