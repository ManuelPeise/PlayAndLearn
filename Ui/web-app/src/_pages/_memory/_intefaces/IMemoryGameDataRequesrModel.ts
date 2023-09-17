import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";

export interface IMemoryGameDataRequesrModel {
  gameType: GameTypeEnum;
  selectedLevel: number;
  selectedTopic: number;
  selectedPlayer: number;
}
