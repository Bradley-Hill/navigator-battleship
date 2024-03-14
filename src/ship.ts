interface Ship {
  length: number;
  impacts: number;
  sunk: boolean;
}

function createShip(): Ship {
  return {
    length: 0,
    impacts: 0,
    sunk: false,
  };
}

module.exports = createShip;
