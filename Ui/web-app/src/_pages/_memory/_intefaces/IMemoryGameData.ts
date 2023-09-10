import { GameLevelTypeEnum } from "../../../_lib/_enums/GameLevelTypeEnum";
import { GameTypeEnum } from "../../../_lib/_enums/GameTypeEnum";
import { IMemoryCard } from "./IMemoryCard";

export interface IMemoryGameData {
  gameId: string;
  gameType: GameTypeEnum;
  gameLevel: GameLevelTypeEnum;
  pairs: number;
  cards: IMemoryCard[];
  error: string;
  topic?: string;
}
