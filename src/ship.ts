interface Ship {
  length: number;
  impacts: number;
  sunk: boolean;
  hit(): void;
}

function createShip(): Ship {
  return {
    length: 0,
    impacts: 0,
    sunk: false,
    hit() {
      this.impacts++;
      if (this.impacts >= this.length) {
        this.sunk = true;
      }
    },
  };
}

module.exports = createShip;
