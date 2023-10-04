import { IMemoryCard } from "./IMemoryCard";

export interface IMemoryPlayer {
  playerId: number;
  name: string;
  isAiPlayer: boolean;
  cards: IMemoryCard[];
}
