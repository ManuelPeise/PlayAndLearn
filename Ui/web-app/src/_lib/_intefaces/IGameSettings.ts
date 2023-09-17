import { GameLevelTypeEnum } from "../_enums/GameLevelTypeEnum";

export interface IGameSettings {
  topic: number;
  level: number;
  player: number;
  isRunning: boolean;
}
