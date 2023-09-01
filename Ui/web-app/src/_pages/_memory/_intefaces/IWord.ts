import { GameLevelTypeEnum } from "../../../_lib/_enums/GameLevelTypeEnum";

export interface IWord {
  key: number;
  value: string;
  levelType: GameLevelTypeEnum;
}
