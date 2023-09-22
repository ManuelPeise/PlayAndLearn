import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { Dispatch, SetStateAction } from "react";
import { IMemoryFileMapping } from "./IMemoryFileMapping";

export interface IMemoryGameContext {
  isLoading: boolean;
  contextData: IMemoryGameContextData;
  handleIsLoadingChanged: Dispatch<SetStateAction<boolean>>;
  onChange: Dispatch<SetStateAction<Partial<IMemoryGameContextData>>>;
}

export interface IMemoryGameContextData {
  gameConfiguration: IGameConfiguration;
  topicItems: IKeyValueItem[];
  levelItems: IKeyValueItem[];
  playerItems: IKeyValueItem[];
  cards: IMemoryFileMapping[];
}
