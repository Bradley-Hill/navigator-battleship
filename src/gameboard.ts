import { createShip, Ship } from "../src/ship";

export type Cell = {
  occupied: boolean;
  hit: boolean;
  ship: Ship | null;
};

interface Gameboard {
  grid: Cell[][];
  createShips(gameboardX: number, gameboardY: number): any;
}

export function createGameboard(size: number): Gameboard {
  let gameboard: Gameboard = {
    grid: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        occupied: false,
        hit: false,
        ship: null,
      }))
    ),
    createShips(gameboardX: number, gameboardY: number) {
      let ship = createShip();
      ship.position = [[gameboardX, gameboardY]];
      gameboard.grid[gameboardX][gameboardY].ship = ship;
      gameboard.grid[gameboardX][gameboardY].occupied = true;
    },
  };
  return gameboard;
}
