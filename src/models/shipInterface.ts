export interface Ship {
  length: number;
  impacts: number;
  sunk: boolean;
  position: [number, number][] | null;
  hit(): void;
  isSunk(): void;
}
