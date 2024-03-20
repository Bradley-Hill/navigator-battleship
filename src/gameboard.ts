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
  ): boolean;
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
    ): boolean {
      let ship = createShip(shipSize);
      ship.position = [];

      for (let i = 0; i < shipSize; i++) {
        if (
          (orientation === "horizontal" && gameboardX + i >= size) ||
          (orientation === "vertical" && gameboardY + i >= size) ||
          gameboard.grid[gameboardX + (orientation === "horizontal" ? i : 0)][
            gameboardY + (orientation === "vertical" ? i : 0)
          ].occupied
        ) {
          return false;
        }
      }

      for (let i = 0; i < shipSize; i++) {
        if (orientation === "horizontal") {
          if (gameboardX + i < size) {
            ship.position.push([gameboardX + i, gameboardY]);
            gameboard.grid[gameboardX + i][gameboardY].ship = ship;
            gameboard.grid[gameboardX + i][gameboardY].occupied = true;
          } else {
            return false;
          }
        } else {
          if (gameboardY + i < size) {
            ship.position.push([gameboardX, gameboardY + i]);
            gameboard.grid[gameboardX][gameboardY + i].ship = ship;
            gameboard.grid[gameboardX][gameboardY + i].occupied = true;
          } else {
            return false;
          }
        }
      }
      return true;
    },
  };
  return gameboard;
}
