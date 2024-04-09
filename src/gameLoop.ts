import { createGameboard } from "../src/gameboard";
import { createPlayer, Player } from "../src/player";

export interface Gameloop {
  gameStarted: boolean;
  isGameStarted: () => boolean;
  startGame: () => void;
  humanPlayer: Player;
  compPlayer: Player;
  manageTurns: (x?: number, y?: number) => void;
  checkEndOfGame: () => void;
  gameOver: boolean;
}

export function createGameLoop(): Gameloop {
  let gameLoop: Gameloop = {
    gameStarted: false,
    isGameStarted: function () {
      return this.gameStarted;
    },
    humanPlayer: createPlayer(true),
    compPlayer: createPlayer(false),
    startGame: function () {
      this.gameStarted = true;
      this.humanPlayer.gameboard = createGameboard(10);
      this.humanPlayer.gameboard.createAllShips();

      this.compPlayer.gameboard = createGameboard(10);
      this.compPlayer.gameboard.createAllShips();
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
            // setTimeout(() => this.manageTurns(), 200);
            if (this.compPlayer.isMyTurn) {
              this.compPlayer.makeComputerMove(this.humanPlayer);
              this.checkEndOfGame();
              if (!this.gameOver) {
                this.humanPlayer.toggleTurn();
                this.compPlayer.toggleTurn();
              }
            }
          }
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
