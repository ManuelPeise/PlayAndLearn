import { GameTopicTypeEnum } from "../_enums/GameTopicTypeEnum";
import { GameTypeEnum } from "../_enums/GameTypeEnum";
import { GameLevelType } from "./IGameLevelType";

export interface IGameSettingsBarData {
  title: string;
  pairCountSelectionItems: number[];
  gameTopics: IGameTopic[];
  gameLevelTypeItems: GameLevelType[];
}

export interface IGameTopic {
  index: number;
  topicName: string;
  topicType: GameTopicTypeEnum;
  gameType: GameTypeEnum;
}
