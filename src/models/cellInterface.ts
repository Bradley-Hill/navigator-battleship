import { Ship } from "./shipInterface";

export type Cell = {
  occupied: boolean;
  hit: boolean;
  ship: Ship | null;
};
