import { GameLevelTypeEnum } from "../_enums/GameLevelTypeEnum";

export interface IGameSettings {
  topicId: number;
  level: GameLevelTypeEnum;
  isRunning: boolean;
}
