import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { IMemoryFileMapping } from "./IMemoryFileMapping";

export interface IMemoryUploadSettings {
  topic: string;
  topicFallbackValue: string;
  hasPlayerSelection: boolean;
  hasLevelSelection: boolean;
  hasTopicSelection: boolean;
  topicItems: IKeyValueItem[];
  files: IMemoryFileMapping[];
}
