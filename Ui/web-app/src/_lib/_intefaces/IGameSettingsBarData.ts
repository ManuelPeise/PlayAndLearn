import { GameTypeEnum } from "../_enums/GameTypeEnum";
import { GameLevelType } from "./IGameLevelType";
import { IKeyValueItem } from "./IKeyValueItem";

export interface IGameSettingsBarData {
  title: string;
  gameTopics: IKeyValueItem[];
  gameLevelTypeItems: IKeyValueItem[];
}
