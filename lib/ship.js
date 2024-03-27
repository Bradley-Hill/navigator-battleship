"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShip = void 0;
function createShip(size) {
    return {
        length: size,
        impacts: 0,
        sunk: false,
        position: null,
        hit: function () {
            this.impacts++;
        },
        isSunk: function () {
            if (this.impacts >= this.length) {
                this.sunk = true;
            }
        },
    };
}
exports.createShip = createShip;
