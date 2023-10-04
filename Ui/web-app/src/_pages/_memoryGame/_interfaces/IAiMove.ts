import { IMemoryCard } from "./IMemoryCard";

export interface IAiMove {
  choiceOne: IMemoryCard | null;
  choiceTwo: IMemoryCard | null;
  isRunnung: boolean;
}
