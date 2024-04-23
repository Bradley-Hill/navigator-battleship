import { Player } from "./playerInterface";

export interface Gameloop {
  gameStarted: boolean;
  setDifficulty: (isHardDifficulty: boolean) => void;
  isGameStarted: () => boolean;
  startGame: () => void;
  humanPlayer: Player;
  compPlayer: Player;
  manageTurns: (x?: number, y?: number) => void;
  checkEndOfGame: () => void;
  gameOver: boolean;
}
