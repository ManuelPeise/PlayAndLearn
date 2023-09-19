import React from "react";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";
import { useTranslation } from "react-i18next";
import { IGameConfigurationValidationResult } from "./useGameSettingsValidation";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";

interface IUseMemoryResult {
  isLoading: boolean;
  validSettings: boolean;
  handleIsloadingChanged: (isLoading: boolean) => void;
  handleConfigurationChanged: (settings: IGameConfiguration) => void;
  onStartGame: () => Promise<boolean>;
}

// const memoryGameEndpoint = `${process.env.REACT_APP_API_URL}MemoryGame/`;

// const gameDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetGameData`;

export const UseMemory = (
  validator: IGameConfigurationValidationResult
): IUseMemoryResult => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [configuration, setConfiguration] = React.useState<IGameConfiguration>({
    selectedTopic: 0,
    selectedLevel: 0,
    selectedPlayer: 0,
    hasWordList: false,
    hasPlayerSelection: false,
    hasLevelSelection: false,
    hasTopicSelection: true,
    topic: "",
    isRunning: false,
  });

  const handleIsloadingChanged = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const handleConfigurationChanged = React.useCallback(
    (configuration: IGameConfiguration) => {
      setConfiguration(configuration);
      validator.validate(configuration, GameTypeEnum.Memory);
    },
    [validator]
  );
  // const dataservices = {
  //   pageDataService: UseApi<IMemoryPageGameData>(
  //     handleIsloadingChanged,
  //     `${memoryGameEndpoint}GetPageData`,
  //     "",
  //     { method: "GET", mode: "cors" }
  //   ),
  // };

  const onStartGame = React.useCallback(
    async (): Promise<boolean> => {
      handleIsloadingChanged(true);

      // if (validator.isValid) {
      //   // var model: IMemoryGameDataRequestModel = {
      //   //   selectedLevel: settings.level,
      //   //   selectedPlayer: settings.player,
      //   //   selectedTopic: settings.topic,
      //   //   gameType: GameTypeEnum.Memory,
      //   // };
      //   try {
      //   //   await dataservices.pageDataService
      //   //     .fetchData(gameDataEndpoint, "", {
      //   //       method: "POST",
      //   //       mode: "cors",
      //   //       body: JSON.stringify(model),
      //   //     })
      //   //     .then(async (res) => {
      //   //       handleIsloadingChanged(false);
      //   //     });

      //   //   return true;
      //   // } catch (error) {
      //   //   return false;
      //   // }
      // }

      return false;
    },
    [
      // dataservices.pageDataService,
      // settings,
      // validator.isValid,
      // handleIsloadingChanged,
    ]
  );

  // const pageData = React.useMemo((): IMemoryPageGameData => {
  //   const topicItems: IKeyValueItem[] = [];
  //   const levelItems: IKeyValueItem[] = [];
  //   const playerItems: IKeyValueItem[] = [];

  //   dataservices.pageDataService.response?.topicDropdownItems.map((item) => {
  //     return topicItems.push({
  //       key: item.key,
  //       value: t(`memory:${item.value}`),
  //     });
  //   });

  //   dataservices.pageDataService.response?.levelDropdownItems.map((item) => {
  //     return levelItems.push({
  //       key: item.key,
  //       value: t(`memory:${item.value}`),
  //     });
  //   });

  //   dataservices.pageDataService.response?.playerDropdownItems.map((item) => {
  //     return playerItems.push({
  //       key: item.key,
  //       value: t(`memory:${item.value}`),
  //     });
  //   });

  //   return {
  //     levelDropdownItems: levelItems,
  //     topicDropdownItems: topicItems,
  //     playerDropdownItems: playerItems,
  //     gameConfiguration:
  //       dataservices.pageDataService.response?.gameConfiguration ??
  //       ({} as IGameConfiguration),
  //     gameData: dataservices.pageDataService.response?.gameData ?? null,
  //   };
  // }, [dataservices.pageDataService, t]);

  React.useEffect(() => {
    validator.validate(configuration, GameTypeEnum.Memory);
  }, [validator, configuration]);

  return {
    isLoading,
    validSettings: validator.isValid,
    onStartGame,
    handleIsloadingChanged,
    handleConfigurationChanged,
  };
};
