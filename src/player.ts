import { createGameboard, Gameboard } from "../src/gameboard";

interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
  name: "Player 1" | "Player 2";
  isMyTurn: boolean;
  makeMove: (x: number, y: number, opponent: Player) => void;
}

export function createPlayer(isHuman: boolean): Player {
  return {
    isHuman: isHuman,
    gameboard: createGameboard(10),
    name: isHuman ? "Player 1" : "Player 2",
    isMyTurn: true,
    makeMove: function (x: number, y: number, opponent: Player) {
      if (this.isMyTurn) {
        opponent.gameboard.receiveAttack(x, y);
      }
    },
  };
}
