import { Ship } from "../src/ship";
export type Cell = {
    occupied: boolean;
    hit: boolean;
    ship: Ship | null;
};
export interface Gameboard {
    size: number;
    grid: Cell[][];
    createShips(gameboardX: number, gameboardY: number, shipSize: number, orientation: "horizontal" | "vertical"): Ship | null;
    receiveAttack(gameboardX: number, gameboardY: number): void;
    missedAttacks: [number, number][];
    allShipsSunk(): boolean;
    getMissedShots: () => number[][];
    getHitCells: () => number[][];
}
export declare function createGameboard(size: number): Gameboard;
