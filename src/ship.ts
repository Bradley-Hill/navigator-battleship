export interface Ship {
  length: number;
  impacts: number;
  sunk: boolean;
  hit(): void;
  isSunk(): void;
}

export function createShip(): Ship {
  return {
    length: 0,
    impacts: 0,
    sunk: false,
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

module.exports = createShip;
