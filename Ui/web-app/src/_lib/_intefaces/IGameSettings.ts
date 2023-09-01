import { GameLevelTypeEnum } from "../_enums/GameLevelTypeEnum";
import { GameTopicTypeEnum } from "../_enums/GameTopicTypeEnum";

export interface IGameSettings {
  topic?: GameTopicTypeEnum;
  level?: GameLevelTypeEnum;
  pairs: number;
}
