import { IMemoryFileMapping } from "./IMemoryFileMapping";
import { IMemoryPlayer } from "./IMemoryPlayer";

export interface IMemorySettings {
  selectedTopic: number;
  selectedLevel: number;
  selectedPlayerMode: number;
  players: IMemoryPlayer[];
  isRunning: boolean;
  cards: IMemoryFileMapping[];
}
