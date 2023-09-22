import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";

export interface IMemoryGameDataRequestModel {
  gameType: GameTypeEnum;
  selectedTopic: number;
  selectedLevel: number;
  selectedPlayer: number;
  isInitialLoad: boolean;
}
