import { createGameboard, Gameboard } from "../src/gameboard";

export interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
  name: "Player 1" | "Player 2";
  isMyTurn: boolean;
  makeHumanMove: (x: number, y: number, opponent: Player) => void;
  makeComputerMove: (opponent: Player) => void;
  makeRandomMove: (opponent: Player) => void;
  toggleTurn: () => void;
  isHardDifficulty: boolean;
}

export function createPlayer(
  isHuman: boolean,
  isHardDifficulty: boolean
): Player {
  return {
    isHuman: isHuman,
    gameboard: createGameboard(10),
    name: isHuman ? "Player 1" : "Player 2",
    isMyTurn: isHuman,
    isHardDifficulty: isHardDifficulty,
    makeHumanMove: function (x: number = 0, y: number = 0, opponent: Player) {
      opponent.gameboard.receiveAttack(x, y);
    },

    toggleTurn: function () {
      this.isMyTurn = !this.isMyTurn;
    },
    makeComputerMove: function (opponent: Player) {
      if (!this.isHuman) {
        if (this.isHardDifficulty) {
          let hitCells = opponent.gameboard.hitCells;
          if (hitCells.length > 0) {
            let adjacentMoveModifiers: number[][] = [
              [0, 1],
              [1, 0],
              [-1, 0],
              [0, -1],
            ];

            let shuffleArray = function (array: any[]) {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
              }
            };

            shuffleArray(adjacentMoveModifiers);

            let lastHitCell = hitCells[hitCells.length - 1];
            let validMoveFound = false;
            while (!validMoveFound && adjacentMoveModifiers.length > 0) {
              let modifier = adjacentMoveModifiers.pop();
              if (modifier) {
                let x = lastHitCell[0] + modifier[0];
                let y = lastHitCell[1] + modifier[1];
                if (
                  x >= 0 &&
                  x < opponent.gameboard.size &&
                  y >= 0 &&
                  y < opponent.gameboard.size &&
                  !opponent.gameboard.missedAttacks.some(
                    (shot) => shot[0] === x && shot[1] === y
                  ) &&
                  !opponent.gameboard.hitCells.some(
                    (hit) => hit[0] === x && hit[1] === y
                  )
                ) {
                  opponent.gameboard.receiveAttack(x, y);
                  validMoveFound = true;
                }
              }
            }
            if (!validMoveFound) {
              this.makeRandomMove(opponent);
            }
          } else {
            this.makeRandomMove(opponent);
          }
        } else {
          this.makeRandomMove(opponent);
        }
        alert("Computer has made an attack");
      }
    },
    makeRandomMove: function (opponent: Player) {
      let validRandomMove = false;
      let x: number = 0;
      let y: number = 0;
      while (!validRandomMove) {
        x = Math.floor(Math.random() * opponent.gameboard.size);
        y = Math.floor(Math.random() * opponent.gameboard.size);

        const missedShots = opponent.gameboard.getMissedShots();
        const hitCells = opponent.gameboard.getHitCells();
        if (
          !missedShots.some((shot) => shot[0] === x && shot[1] == y) &&
          !hitCells.some((cell) => cell[0] === x && cell[1] === y)
        ) {
          validRandomMove = true;
        }
      }
      opponent.gameboard.receiveAttack(x, y);
    },
  };
}
