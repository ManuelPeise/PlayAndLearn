import { IGameConfiguration } from "src/_lib/_intefaces/IGameSettingsConfiguration";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { IGameDataResponse } from "./IMemoryGameData";

export interface IMemoryPageGameData {
  topicDropdownItems: IKeyValueItem[];
  levelDropdownItems: IKeyValueItem[];
  playerDropdownItems: IKeyValueItem[];
  gameConfiguration: IGameConfiguration;
  gameData: IGameDataResponse | null;
}
