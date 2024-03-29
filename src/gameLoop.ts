import { createGameboard } from "../src/gameboard";
import { createPlayer, Player } from "../src/player";

export interface Gameloop {
  startGame: () => void;
  humanPlayer: Player;
  compPlayer: Player;
  manageTurns: (x?: number, y?: number) => void;
  checkEndOfGame: () => void;
  gameOver: boolean;
}

export function createGameLoop(): Gameloop {
  let gameLoop: Gameloop = {
    humanPlayer: createPlayer(true),
    compPlayer: createPlayer(false),
    startGame: function () {
      this.humanPlayer.gameboard = createGameboard(10);
      this.humanPlayer.gameboard.createShips(0, 0, 1, "horizontal");
      this.humanPlayer.gameboard.createShips(0, 1, 1, "horizontal");
      this.humanPlayer.gameboard.createShips(0, 2, 1, "horizontal");

      this.compPlayer.gameboard = createGameboard(10);
      this.compPlayer.gameboard.createShips(0, 0, 1, "horizontal");
      this.compPlayer.gameboard.createShips(0, 1, 1, "horizontal");
      this.compPlayer.gameboard.createShips(0, 2, 1, "horizontal");
      this.manageTurns();
    },
    manageTurns: function (x?: number, y?: number) {
      if (this.gameOver) {
        return;
      }
      if (this.humanPlayer.isMyTurn) {
        console.log("Human players Turn");
        if (x !== undefined && y !== undefined) {
          this.humanPlayer.makeHumanMove(x, y, this.compPlayer);
          this.checkEndOfGame();
          if (!this.gameOver) {
            this.humanPlayer.toggleTurn();
            this.compPlayer.toggleTurn();
            setTimeout(() => this.manageTurns(), 200);
          }
        }
      } else {
        console.log("Computers players turn");
        this.compPlayer.makeComputerMove(this.humanPlayer);
        this.checkEndOfGame();
        if (!this.gameOver) {
          this.humanPlayer.toggleTurn();
          this.compPlayer.toggleTurn();
        }
      }
    },
    checkEndOfGame: function () {
      if (this.compPlayer.gameboard.allShipsSunk()) {
        console.log("Congratulations! You have won!");
        this.gameOver = true;
      } else if (this.humanPlayer.gameboard.allShipsSunk()) {
        console.log("Game Over, you lost...");
        this.gameOver = true;
      }
    },
    gameOver: false,
  };
  return gameLoop;
}
