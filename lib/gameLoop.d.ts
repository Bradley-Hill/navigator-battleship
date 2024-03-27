import { Player } from "../src/player";
export interface Gameloop {
    startGame: () => void;
    humanPlayer: Player;
    compPlayer: Player;
    manageTurns: () => void;
    checkEndOfGame: () => void;
    gameOver: boolean;
}
export declare function createGameLoop(): Gameloop;
