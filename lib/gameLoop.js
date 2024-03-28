"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameLoop = void 0;
var gameboard_1 = require("../src/gameboard");
var player_1 = require("../src/player");
function createGameLoop() {
    var gameLoop = {
        humanPlayer: (0, player_1.createPlayer)(true),
        compPlayer: (0, player_1.createPlayer)(false),
        startGame: function () {
            this.humanPlayer.gameboard = (0, gameboard_1.createGameboard)(10);
            this.humanPlayer.gameboard.createShips(0, 0, 1, "horizontal");
            this.humanPlayer.gameboard.createShips(0, 1, 1, "horizontal");
            this.humanPlayer.gameboard.createShips(0, 2, 1, "horizontal");
            this.compPlayer.gameboard = (0, gameboard_1.createGameboard)(10);
            this.compPlayer.gameboard.createShips(0, 0, 1, "horizontal");
            this.compPlayer.gameboard.createShips(0, 1, 1, "horizontal");
            this.compPlayer.gameboard.createShips(0, 2, 1, "horizontal");
            while (!this.gameOver) {
                this.manageTurns();
                this.checkEndOfGame();
            }
        },
        manageTurns: function () {
            if (this.humanPlayer.isMyTurn) {
                // this.humanPlayer.makeHumanMove(
                //   0,
                //   0,
                //   /* Take co-ordinates from DOM manipulation */ this.compPlayer
                // );
            }
            else {
                this.compPlayer.makeComputerMove(this.humanPlayer);
            }
            this.humanPlayer.toggleTurn();
            this.compPlayer.toggleTurn();
        },
        checkEndOfGame: function () {
            if (this.compPlayer.gameboard.allShipsSunk()) {
                console.log("Congratulations! You have won!");
                this.gameOver = true;
            }
            else if (this.humanPlayer.gameboard.allShipsSunk()) {
                console.log("Game Over, you lost...");
                this.gameOver = true;
            }
        },
        gameOver: false,
    };
    return gameLoop;
}
exports.createGameLoop = createGameLoop;
