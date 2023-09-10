import { IApiResult } from "src/_lib/_intefaces/IApiResult";
import { IMemoryGameData } from "./IMemoryGameData";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";

export interface IMemoryDataServices {
  gameDataService: IApiResult<IMemoryGameData>;
  topicDataService: IApiResult<IKeyValueItem[]>;
}
