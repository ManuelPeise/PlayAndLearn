import { GameTypeEnum } from "../_enums/GameTypeEnum";
import { TopicTypeEnum } from "../_enums/TopicTypeEnum";

export interface IMemorySettingsBarData {
  title: string;
  gameTopics: IMemoryTopic[];
}

export interface IMemoryTopic {
  index: number;
  topicName: string;
  topicType: TopicTypeEnum;
  gameType: GameTypeEnum;
}
