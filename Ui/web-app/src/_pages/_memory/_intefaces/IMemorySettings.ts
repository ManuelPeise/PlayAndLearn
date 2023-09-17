import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { IMemoryFileMapping } from "./IMemoryFileMapping";

export interface IMemorySettings {
  topic: string;
  topicFallbackValue: string;
  hasPlayerSelection: boolean;
  hasLevelSelection: boolean;
  hasTopicSelection: boolean;
  topics: IKeyValueItem[];
  files: IMemoryFileMapping[];
}
