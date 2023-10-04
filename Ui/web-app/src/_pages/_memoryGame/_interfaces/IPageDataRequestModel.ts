import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";

export interface IPageDataRequestModel {
  gameType: GameTypeEnum;
  selectedTopic: number;
  selectedLevel: number;
  selectedPlayer: number;
  isInitialLoad: boolean;
}
