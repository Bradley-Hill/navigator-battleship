import { createShip, Ship } from "../src/ship";

export type Cell = {
  occupied: boolean;
  hit: boolean;
  ship: Ship | null;
};

export interface Gameboard {
  size: number;
  grid: Cell[][];
  createShips(
    gameboardX: number,
    gameboardY: number,
    shipSize: number,
    orientation: "horizontal" | "vertical"
  ): Ship | null;
  receiveAttack(gameboardX: number, gameboardY: number): void;
  missedAttacks: [number, number][];
  allShipsSunk(): boolean;
  getMissedShots: () => number[][];
  getHitCells: () => number[][];
}

export function createGameboard(size: number): Gameboard {
  let gameboard: Gameboard = {
    size: size,
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
    ): Ship | null {
      let ship = createShip(shipSize);
      ship.position = [];

      for (let i = 0; i < shipSize; i++) {
        let x = gameboardX + (orientation === "horizontal" ? i : 0);
        let y = gameboardY + (orientation === "vertical" ? i : 0);

        if (x >= size || y >= size || gameboard.grid[x][y].occupied) {
          return null;
        }
        ship.position.push([x, y]);
        gameboard.grid[x][y].ship = ship;
        gameboard.grid[x][y].occupied = true;
      }
      return ship;
    },
    receiveAttack(gameboardX: number, gameboardY: number): void {
      gameboard.grid[gameboardX][gameboardY].hit = true;
      if (gameboard.grid[gameboardX][gameboardY].occupied) {
        gameboard.grid[gameboardX][gameboardY].ship?.hit();
      } else {
        gameboard.missedAttacks.push([gameboardX, gameboardY]);
      }
    },
    missedAttacks: [],
    allShipsSunk() {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid.length; j++) {
          if (this.grid[i][j].occupied) {
            this.grid[i][j].ship?.isSunk();
            if (!this.grid[i][j].ship?.sunk) {
              return false;
            } else {
              continue;
            }
          }
        }
      }
      return true;
    },
    getMissedShots: function () {
      return this.missedAttacks;
    },
    getHitCells: function () {
      const hitCells: number[][] = [];
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.grid[i][j].hit) {
            hitCells.push([i, j]);
          }
        }
      }
      return hitCells;
    },
  };
  return gameboard;
}
