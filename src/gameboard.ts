type Cell = {
  occupied: boolean;
  hit: boolean;
};

function createGameboard(size: number): Cell[][] {
  let gameboard = new Array(size);
  gameboard = gameboard.map(() => new Array(size));
  //using nested .map methods to add objects(Cell) to the gameboard(2d array)
  gameboard = gameboard.map((row) =>
    row.map(() => ({ occupied: false, hit: false }))
  );
  return gameboard;
}

module.exports = createGameboard;
