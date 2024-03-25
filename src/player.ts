import { createGameboard, Gameboard } from "../src/gameboard";

export interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
  name: "Player 1" | "Player 2";
  isMyTurn: boolean;
  makeMove: (x: number, y: number, opponent: Player) => void;
  toggleTurn: () => void;
}

export function createPlayer(isHuman: boolean): Player {
  return {
    isHuman: isHuman,
    gameboard: createGameboard(10),
    name: isHuman ? "Player 1" : "Player 2",
    isMyTurn: isHuman,
    makeMove: function (x: number, y: number, opponent: Player) {
      if (!this.isHuman) {
        let validMove = false;
        while (!validMove) {
          x = Math.floor(Math.random() * opponent.gameboard.size);
          y = Math.floor(Math.random() * opponent.gameboard.size);

          const missedShots = opponent.gameboard.getMissedShots();
          const hitCells = opponent.gameboard.getHitCells();
          if (
            !missedShots.some((shot) => shot[0] === x && shot[1] == y) &&
            !hitCells.some((cell) => cell[0] === x && cell[1] === y)
          ) {
            validMove = true;
          }
        }
      }
      opponent.gameboard.receiveAttack(x, y);
    },
    toggleTurn: function () {
      this.isMyTurn = !this.isMyTurn;
    },
  };
}
