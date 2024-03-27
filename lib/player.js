"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayer = void 0;
var gameboard_1 = require("../src/gameboard");
function createPlayer(isHuman) {
    return {
        isHuman: isHuman,
        gameboard: (0, gameboard_1.createGameboard)(10),
        name: isHuman ? "Player 1" : "Player 2",
        isMyTurn: isHuman,
        makeHumanMove: function (x, y, opponent) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (this.isHuman) {
                opponent.gameboard.receiveAttack(x, y);
            }
        },
        makeComputerMove: function (opponent) {
            if (!this.isHuman) {
                var validMove = false;
                var x_1 = 0;
                var y_1 = 0;
                while (!validMove) {
                    x_1 = Math.floor(Math.random() * opponent.gameboard.size);
                    y_1 = Math.floor(Math.random() * opponent.gameboard.size);
                    var missedShots = opponent.gameboard.getMissedShots();
                    var hitCells = opponent.gameboard.getHitCells();
                    if (!missedShots.some(function (shot) { return shot[0] === x_1 && shot[1] == y_1; }) &&
                        !hitCells.some(function (cell) { return cell[0] === x_1 && cell[1] === y_1; })) {
                        validMove = true;
                    }
                }
                opponent.gameboard.receiveAttack(x_1, y_1);
            }
        },
        toggleTurn: function () {
            this.isMyTurn = !this.isMyTurn;
        },
    };
}
exports.createPlayer = createPlayer;
