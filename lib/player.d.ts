import { Gameboard } from "../src/gameboard";
export interface Player {
    isHuman: boolean;
    gameboard: Gameboard;
    name: "Player 1" | "Player 2";
    isMyTurn: boolean;
    makeHumanMove: (x: number, y: number, opponent: Player) => void;
    makeComputerMove: (opponent: Player) => void;
    toggleTurn: () => void;
}
export declare function createPlayer(isHuman: boolean): Player;
