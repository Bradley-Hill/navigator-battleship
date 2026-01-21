import { Cell } from "./cellInterface";
import { Ship } from "./shipInterface";

export interface Gameboard {
  size: number;
  grid: Cell[][];
  createShips(
    gameboardX: number,
    gameboardY: number,
    shipSize: number,
    orientation: "horizontal" | "vertical"
  ): Ship | null;
  createAllShips(): void;
  receiveAttack(gameboardX: number, gameboardY: number): void;
  missedAttacks: [number, number][];
  hitCells: [number, number][];
  allShipsSunk(): boolean;
  getMissedShots: () => [number, number][];
  getHitCells: () => [number, number][];
}
