import { createGameboard } from "../src/gameboard";
import { createPlayer, Player } from "../src/player";

export interface Gameloop {
  startGame: () => void;
  humanPlayer: Player;
  compPlayer: Player;
  manageTurns: () => void;
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

      while(!this.gameOver){
        this.manageTurns();
        this.checkEndOfGame();
      }
    },
    manageTurns: function () {
      if (this.humanPlayer.isMyTurn) {
        this.humanPlayer.makeHumanMove(/* pass coordinates here from the DOM */, this.compPlayer);
      } else {
        this.compPlayer.makeComputerMove(this.humanPlayer);
      }

      this.humanPlayer.toggleTurn();
      this.compPlayer.toggleTurn();
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
    gameOver: false
  };
  return gameLoop;
}
