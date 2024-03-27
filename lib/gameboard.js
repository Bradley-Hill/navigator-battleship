"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameboard = void 0;
var ship_1 = require("../src/ship");
function createGameboard(size) {
    var gameboard = {
        size: size,
        grid: Array.from({ length: size }, function () {
            return Array.from({ length: size }, function () { return ({
                occupied: false,
                hit: false,
                ship: null,
            }); });
        }),
        createShips: function (gameboardX, gameboardY, shipSize, orientation) {
            var ship = (0, ship_1.createShip)(shipSize);
            ship.position = [];
            for (var i = 0; i < shipSize; i++) {
                var x = gameboardX + (orientation === "horizontal" ? i : 0);
                var y = gameboardY + (orientation === "vertical" ? i : 0);
                if (x >= size || y >= size || gameboard.grid[x][y].occupied) {
                    return null;
                }
                ship.position.push([x, y]);
                gameboard.grid[x][y].ship = ship;
                gameboard.grid[x][y].occupied = true;
            }
            return ship;
        },
        receiveAttack: function (gameboardX, gameboardY) {
            var _a;
            if (gameboard.grid[gameboardX][gameboardY].occupied) {
                gameboard.grid[gameboardX][gameboardY].hit = true;
                (_a = gameboard.grid[gameboardX][gameboardY].ship) === null || _a === void 0 ? void 0 : _a.hit();
            }
            else {
                gameboard.missedAttacks.push([gameboardX, gameboardY]);
            }
        },
        missedAttacks: [],
        allShipsSunk: function () {
            var _a, _b;
            for (var i = 0; i < this.grid.length; i++) {
                for (var j = 0; j < this.grid.length; j++) {
                    if (this.grid[i][j].occupied) {
                        (_a = this.grid[i][j].ship) === null || _a === void 0 ? void 0 : _a.isSunk();
                        if (!((_b = this.grid[i][j].ship) === null || _b === void 0 ? void 0 : _b.sunk)) {
                            return false;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            return true;
        },
        getMissedShots: function () {
            return this.missedAttacks;
        },
        getHitCells: function () {
            var hitCells = [];
            for (var i = 0; i < this.size; i++) {
                for (var j = 0; j < this.size; j++) {
                    if (this.grid[i][j].hit) {
                        hitCells.push([i, j]);
                    }
                }
            }
            return hitCells;
        },
    };
    return gameboard;
}
exports.createGameboard = createGameboard;
