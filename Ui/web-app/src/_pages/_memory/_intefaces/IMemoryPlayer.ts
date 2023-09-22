import { IPlayer } from "src/_lib/_intefaces/IPlayer";

export interface IMemoryPlayer extends IPlayer {
  isAi: boolean;
  matches: number;
}
