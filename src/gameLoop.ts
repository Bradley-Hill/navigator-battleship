import { createGameboard } from "../src/gameboard";
import { createPlayer } from "../src/player";
import { Gameloop } from "../src/models/gameloopInterface";

export function createGameLoop(isHardDifficulty: boolean): Gameloop {
  let gameLoop: Gameloop = {
    gameStarted: false,
    setDifficulty: function (isHardDifficulty: boolean) {
      this.humanPlayer.isHardDifficulty = isHardDifficulty;
      this.compPlayer.isHardDifficulty = isHardDifficulty;
    },
    isGameStarted: function () {
      return this.gameStarted;
    },
    humanPlayer: createPlayer(true, isHardDifficulty),
    compPlayer: createPlayer(false, isHardDifficulty),
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
        if (x !== undefined && y !== undefined) {
          this.humanPlayer.makeHumanMove(x, y, this.compPlayer);
          this.checkEndOfGame();
          if (!this.gameOver) {
            this.humanPlayer.toggleTurn();
            this.compPlayer.toggleTurn();

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
        alert("Congratulations! You have won!");
        console.log("Congratulations! You have won!");
        this.gameOver = true;
      } else if (this.humanPlayer.gameboard.allShipsSunk()) {
        alert("Game Over, you lost...");
        console.log("Game Over, you lost...");
        this.gameOver = true;
      }
    },
    gameOver: false,
  };
  return gameLoop;
}
