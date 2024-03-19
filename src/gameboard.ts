import { createShip, Ship } from "../src/ship";

export type Cell = {
  occupied: boolean;
  hit: boolean;
  ship?: Ship;
};

interface Gameboard {
  grid: Cell[][];
  createShips(gameboardX: number, gameboardY: number): any;
}

function createGameboard(size: number): Gameboard {
  let gameboard: Gameboard = {
    grid: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ occupied: false, hit: false }))
    ),
    createShips(gameboardX: number, gameboardY: number) {
      gameboard.grid[gameboardX][gameboardY].ship = createShip();
      gameboard.grid[gameboardX][gameboardY].occupied = true;
    },
  };
  return gameboard;
}

module.exports = createGameboard;
