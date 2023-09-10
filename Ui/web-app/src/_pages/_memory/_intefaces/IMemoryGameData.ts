import { GameLevelTypeEnum } from "../../../_lib/_enums/GameLevelTypeEnum";
import { GameTypeEnum } from "../../../_lib/_enums/GameTypeEnum";

export interface IMemoryGameData {
  gameId: string;
  gameType: GameTypeEnum;
  gameLevel: GameLevelTypeEnum;
  pairs: number;
  cards: IMemoryCard[];
  error: string;
  topic?: string;
}

export interface IMemoryCard {
  key: string;
  background: Blob;
  foreground: Blob;
  disabled: boolean;
}
