import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";

export interface IMemoryGameDataRequestModel {
  gameType: GameTypeEnum;
  selectedLevel: number;
  selectedTopic: number;
  selectedPlayer: number;
  isInitialLoad: boolean;
}
