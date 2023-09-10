import React from "react";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";
import { IGameSettings } from "../_lib/_intefaces/IGameSettings";
import { UseApi } from "./useApi";
import { IGameSettingsValidationResult } from "./useGameSettingsValidation";
import { IMemoryGameData } from "../_pages/_memory/_intefaces/IMemoryGameData";
import { IKeyValueItem } from "../_lib/_intefaces/IKeyValueItem";
import { IUseFileUploadResult, UseFileUpload } from "./useFileUpload";

interface IUseMemoryResult {
  isLoading: boolean;
  gameData: IMemoryGameData;
  topics: IKeyValueItem[];
  fileUploadHandler: IUseFileUploadResult;
  handleIsloadingChanged: (isLoading: boolean) => void;
}

export const UseMemory = (
  settings: IGameSettings,
  validator: IGameSettingsValidationResult
): IUseMemoryResult => {
  const gameDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetGameData`;
  const topicDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetTopics`;
  const fileUploadHandler = UseFileUpload();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleIsloadingChanged = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const gameDataService = UseApi<IMemoryGameData>(handleIsloadingChanged);

  const topicDataService = UseApi<IKeyValueItem[]>(
    handleIsloadingChanged,
    topicDataEndpoint,
    `?gameType=${GameTypeEnum.Memory}`,
    { method: "GET", mode: "cors" }
  );

  React.useEffect(() => {
    validator.validate(settings, GameTypeEnum.Memory);
  }, [validator, settings]);

  React.useEffect(() => {
    if (validator.isValid) {
      gameDataService.fetchData(
        `${gameDataEndpoint}`,
        `?gameType=${GameTypeEnum.Memory}&gameLevel=${settings.level}&gameTopic=${settings.topicId}`,
        { method: "GET", mode: "cors" }
      );
    }
    // eslint-disable-next-line
  }, [validator.isValid, settings]);

  return {
    isLoading,
    fileUploadHandler,
    gameData: gameDataService.response ?? ({} as IMemoryGameData),
    topics: topicDataService.response ?? [],
    handleIsloadingChanged,
  };
};
