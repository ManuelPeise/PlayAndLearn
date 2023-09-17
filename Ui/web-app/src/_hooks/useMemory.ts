import React from "react";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";
import { IGameSettings } from "../_lib/_intefaces/IGameSettings";
import { IGameSettingsValidationResult } from "./useGameSettingsValidation";
import { IGameDataResponse } from "../_pages/_memory/_intefaces/IMemoryGameData";
import { IKeyValueItem } from "../_lib/_intefaces/IKeyValueItem";
import { UseApi } from "./useApi";
import { IMemoryPageData } from "src/_pages/_memory/_intefaces/IMemoryPageData";
import { useTranslation } from "react-i18next";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameSettingsConfiguration";
import { IMemoryGameDataRequesrModel } from "src/_pages/_memory/_intefaces/IMemoryGameDataRequesrModel";

interface IUseMemoryResult {
  isLoading: boolean;
  gameData: IGameDataResponse;
  pageData: IMemoryPageData;
  settings: IGameSettings;
  validSettings: boolean;
  handleIsloadingChanged: (isLoading: boolean) => void;
  handleSettingsChanged: (settings: IGameSettings) => void;
  onStartGame: () => Promise<boolean>;
}
const pageDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetPageData`;
const gameDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetGameData`;

export const UseMemory = (
  validator: IGameSettingsValidationResult
): IUseMemoryResult => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<IGameSettings>({
    topic: 0,
    level: 0,
    player: 0,
    isRunning: false,
  });

  const handleIsloadingChanged = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const handleSettingsChanged = React.useCallback(
    (settings: IGameSettings) => {
      setSettings(settings);
      validator.validate(settings, GameTypeEnum.Memory);
    },
    [validator]
  );
  const dataservices = {
    pageDataService: UseApi<IMemoryPageData>(
      handleIsloadingChanged,
      pageDataEndpoint,
      "",
      { method: "GET", mode: "cors" }
    ),
  };

  const onStartGame = React.useCallback(async (): Promise<boolean> => {
    handleIsloadingChanged(true);

    if (validator.isValid) {
      var model: IMemoryGameDataRequesrModel = {
        selectedLevel: settings.level,
        selectedPlayer: settings.player,
        selectedTopic: settings.topic,
        gameType: GameTypeEnum.Memory,
      };
      try {
        await dataservices.pageDataService
          .fetchData(gameDataEndpoint, "", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(model),
          })
          .then(async (res) => {
            handleIsloadingChanged(false);
          });

        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  }, [
    dataservices.pageDataService,
    settings,
    validator.isValid,
    handleIsloadingChanged,
  ]);

  const pageData = React.useMemo((): IMemoryPageData => {
    const topicItems: IKeyValueItem[] = [];
    const levelItems: IKeyValueItem[] = [];
    const playerItems: IKeyValueItem[] = [];

    dataservices.pageDataService.response?.topicDropdownItems.map((item) => {
      return topicItems.push({
        key: item.key,
        value: t(`memory:${item.value}`),
      });
    });

    dataservices.pageDataService.response?.levelDropdownItems.map((item) => {
      return levelItems.push({
        key: item.key,
        value: t(`memory:${item.value}`),
      });
    });

    dataservices.pageDataService.response?.playerDropdownItems.map((item) => {
      return playerItems.push({
        key: item.key,
        value: t(`memory:${item.value}`),
      });
    });

    return {
      levelDropdownItems: levelItems,
      topicDropdownItems: topicItems,
      playerDropdownItems: playerItems,
      gameConfiguration:
        dataservices.pageDataService.response?.gameConfiguration ??
        ({} as IGameConfiguration),
      gameData: dataservices.pageDataService.response?.gameData ?? null,
    };
  }, [dataservices.pageDataService, t]);

  React.useEffect(() => {
    validator.validate(settings, GameTypeEnum.Memory);
  }, [validator, settings]);

  return {
    isLoading,
    pageData,
    gameData:
      dataservices.pageDataService.response?.gameData ??
      ({} as IGameDataResponse),
    settings,
    validSettings: validator.isValid,
    onStartGame,
    handleIsloadingChanged,
    handleSettingsChanged,
  };
};
