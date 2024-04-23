import { Gameboard } from "../gameboard";

export interface Player {
  isHuman: boolean;
  gameboard: Gameboard;
  name: "Player 1" | "Player 2";
  isMyTurn: boolean;
  makeHumanMove: (x: number, y: number, opponent: Player) => void;
  makeComputerMove: (opponent: Player) => void;
  makeRandomMove: (opponent: Player) => void;
  toggleTurn: () => void;
  isHardDifficulty: boolean;
}
