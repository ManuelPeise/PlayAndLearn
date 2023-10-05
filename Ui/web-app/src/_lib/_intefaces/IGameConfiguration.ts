import { GameTypeEnum } from "../_enums/GameTypeEnum";

export interface IGameConfiguration {
  gameType?: GameTypeEnum;
  topic?: string;
  hasTopicSelection: boolean;
  hasLevelSelection: boolean;
  hasPlayerSelection: boolean;
  hasWordList: boolean;
  selectedTopic: number;
  selectedLevel: number;
  selectedPlayer: number;
  isRunning: boolean;
}
