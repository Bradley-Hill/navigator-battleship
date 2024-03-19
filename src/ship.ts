export interface Ship {
  length: number;
  impacts: number;
  sunk: boolean;
  position: [number, number][] | null;
  hit(): void;
  isSunk(): void;
}

export function createShip(): Ship {
  return {
    length: 1,
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
