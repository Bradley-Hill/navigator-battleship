import { createGameboard, Gameboard } from "../src/gameboard";

export interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
  name: "Player 1" | "Player 2";
  isMyTurn: boolean;
  makeHumanMove: (x: number, y: number, opponent: Player) => void;
  makeComputerMove: (opponent: Player) => void;
  toggleTurn: () => void;
}

export function createPlayer(isHuman: boolean): Player {
  return {
    isHuman: isHuman,
    gameboard: createGameboard(10),
    name: isHuman ? "Player 1" : "Player 2",
    isMyTurn: isHuman,
    makeHumanMove: function (x: number = 0, y: number = 0, opponent: Player) {
      console.log(x);
      console.log(y);
      opponent.gameboard.receiveAttack(x, y);
    },

    makeComputerMove: function (opponent: Player) {
      let validMove: number[] | null = null;
      const adjacencyModifiers = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ];
      const hitCells = opponent.gameboard.getHitCells();
      hitCells.forEach((hitCell) => {
        adjacencyModifiers.forEach((modifier) => {
          const adjacentX = hitCell[0] + modifier[0];
          const adjacentY = hitCell[1] + modifier[1];

          if (
            adjacentX < this.gameboard.size &&
            adjacentX >= 0 &&
            adjacentY < this.gameboard.size &&
            adjacentY >= 0
          ) {
            if (
              !this.gameboard
                .getHitCells()
                .some(
                  (cell) => cell[0] === adjacentX && cell[1] === adjacentY
                ) &&
              !this.gameboard
                .getMissedShots()
                .some((cell) => cell[0] === adjacentX && cell[1] === adjacentY)
            ) {
              validMove = [adjacentX, adjacentY];
            }
          }
        });
      });
      if (validMove) {
        if (!this.isHuman) {
          let x: number = validMove[0];
          let y: number = validMove[1];
          opponent.gameboard.receiveAttack(x, y);
          // validMove = null;
        }
      } else {
        if (!this.isHuman) {
          // if(!opponent.gameboard.getHitCells() || )
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
        }
        console.log("Computer made a move");
      }
    },
    toggleTurn: function () {
      this.isMyTurn = !this.isMyTurn;
    },
  };
}
