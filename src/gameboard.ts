import { createShip, Ship } from "../src/ship";

export type Cell = {
  occupied: boolean;
  hit: boolean;
  ship: Ship | null;
};

interface Gameboard {
  grid: Cell[][];
  createShips(
    gameboardX: number,
    gameboardY: number,
    shipSize: number,
    orientation: "horizontal" | "vertical"
  ): any;
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
    createShips(
      gameboardX: number,
      gameboardY: number,
      shipSize: number,
      orientation: "horizontal" | "vertical"
    ) {
      let ship = createShip();
      ship.position = [];

      for (let i = 0; i < shipSize; i++) {
        if (orientation === "horizontal") {
          if (gameboardX + i < size) {
            ship.position.push([gameboardX + i, gameboardY]);
            gameboard.grid[gameboardX + i][gameboardY].ship = ship;
            gameboard.grid[gameboardX + i][gameboardY].occupied = true;
          }
        } else {
          if (gameboardY + i < size) {
            ship.position.push([gameboardX, gameboardY + i]);
            gameboard.grid[gameboardX][gameboardY + i].ship = ship;
            gameboard.grid[gameboardX][gameboardY + i].occupied = true;
          }
        }
      }
    },
  };
  return gameboard;
}
