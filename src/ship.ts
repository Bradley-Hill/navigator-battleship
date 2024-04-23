import { Ship } from "../src/models/shipInterface";

export function createShip(size: number): Ship {
  return {
    length: size,
    impacts: 0,
    sunk: false,
    position: null,
    hit() {
      this.impacts++;
    },
    isSunk() {
      if (this.impacts >= this.length) {
        this.sunk = true;
      }
    },
  };
}
