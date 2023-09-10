import React from "react";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";
import { IGameSettings } from "../_lib/_intefaces/IGameSettings";
import { IGameSettingsValidationResult } from "./useGameSettingsValidation";
import { IMemoryGameData } from "../_pages/_memory/_intefaces/IMemoryGameData";
import { IKeyValueItem } from "../_lib/_intefaces/IKeyValueItem";
import { UseApi } from "./useApi";
import { IMemoryPageData } from "src/_pages/_memory/_intefaces/IMemoryPageData";

interface IUseMemoryResult {
  isLoading: boolean;
  gameData: IMemoryGameData;
  topics: IKeyValueItem[];
  levels: IKeyValueItem[];
  handleIsloadingChanged: (isLoading: boolean) => void;
}
const pageDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetPageData`;
//const gameDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetGameData`;

export const UseMemory = (
  settings: IGameSettings,
  validator: IGameSettingsValidationResult
): IUseMemoryResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleIsloadingChanged = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const dataservices = {
    pageDataService: UseApi<IMemoryPageData>(
      handleIsloadingChanged,
      pageDataEndpoint,
      "",
      { method: "GET", mode: "cors" }
    ),
  };

  // const dataservices: IMemoryDataServices = {
  //   gameDataService: UseApi<IMemoryGameData>(handleIsloadingChanged),
  //   topicDataService: UseApi<IKeyValueItem[]>(
  //     handleIsloadingChanged,
  //     topicDataEndpoint,
  //     `?gameType=${GameTypeEnum.Memory}`,
  //     { method: "GET", mode: "cors" }
  //   ),
  // };

  React.useEffect(() => {
    validator.validate(settings, GameTypeEnum.Memory);
  }, [validator, settings]);

  React.useEffect(() => {
    // if (validator.isValid) {
    //   dataservices.gameDataService.fetchData(
    //     `${gameDataEndpoint}`,
    //     `?gameType=${GameTypeEnum.Memory}&gameLevel=${settings.level}&gameTopic=${settings.topicId}`,
    //     { method: "GET", mode: "cors" }
    //   );
    // }
    // eslint-disable-next-line
  }, [validator.isValid, settings]);

  return {
    isLoading,
    levels: dataservices.pageDataService.response?.levels ?? [],
    topics: dataservices.pageDataService.response?.topics ?? [],
    gameData: {} as IMemoryGameData,
    handleIsloadingChanged,
  };
};
