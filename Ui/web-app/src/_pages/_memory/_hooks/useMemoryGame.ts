import React from "react";
import { UseApi } from "src/_hooks/useApi";
import { IMemoryGameContextData } from "../_intefaces/IMemoryGameContext";
import { IMemoryGameDataRequestModel } from "../_intefaces/IMemoryGameDataRequestModel";
import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";

const memoryGameUploadController = `${process.env.REACT_APP_API_URL}MemoryGame/`;

export interface IUseMemoryGameResult {
  isLoading: boolean;
  dataIsBound: boolean;
  contextData: IMemoryGameContextData | null;
  handleContextDataChanged: (model: IMemoryGameContextData) => void;
  handleGameConfigurationChanged: (
    gameConfiguration: IGameConfiguration
  ) => Promise<void>;
}

const useMemoryGame = (): IUseMemoryGameResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [contextData, setContextData] =
    React.useState<IMemoryGameContextData | null>(null);
  const handleIsLoadingChanged = React.useCallback((isLaoding: boolean) => {
    setIsLoading(isLaoding);
  }, []);

  const pageDataRequestModel = React.useMemo(() => {
    const requestModel: IMemoryGameDataRequestModel = {
      gameType: GameTypeEnum.Memory,
      selectedTopic: contextData?.gameConfiguration.selectedTopic ?? 0,
      selectedLevel: contextData?.gameConfiguration.selectedLevel ?? 0,
      selectedPlayer: contextData?.gameConfiguration.selectedPlayer ?? 0,
      isInitialLoad: contextData == null,
    };

    return requestModel;
  }, [contextData]);

  const handleContextDataChanged = React.useCallback(
    (model: IMemoryGameContextData) => {
      console.log(model);
      setContextData(model);
    },
    []
  );

  const { memoryGameContextDataService } = {
    memoryGameContextDataService: UseApi<IMemoryGameContextData>(
      handleIsLoadingChanged,
      `${memoryGameUploadController}GetMemoryGamePageData`,
      "",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(pageDataRequestModel),
      }
    ),
  };

  const RefreshPageData = React.useCallback(
    async (body: IMemoryGameDataRequestModel) => {
      await memoryGameContextDataService.fetchData(
        `${memoryGameUploadController}GetMemoryGamePageData`,
        "",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
        }
      );
      // eslint-disable-next-line
    },
    []
  );

  const handleGameConfigurationChanged = React.useCallback(
    async (gameConfiguration: IGameConfiguration) => {
      console.log("context:", contextData);
      console.log(gameConfiguration);

      setContextData({
        ...(contextData ?? ({} as IMemoryGameContextData)),
        gameConfiguration: gameConfiguration,
      });

      await RefreshPageData({
        selectedLevel: gameConfiguration.selectedLevel,
        selectedPlayer: gameConfiguration.selectedPlayer,
        selectedTopic: gameConfiguration.selectedTopic,
        isInitialLoad: false,
        gameType: GameTypeEnum.Memory,
      });
    },
    // eslint-disable-next-line
    [contextData, RefreshPageData]
  );

  React.useEffect(() => {
    if (memoryGameContextDataService.response !== undefined) {
      setContextData(memoryGameContextDataService.response);
    }
    // eslint-disable-next-line
  }, [memoryGameContextDataService.response]);

  console.log("CARDS:", contextData?.cards);
  return {
    isLoading,
    contextData,
    dataIsBound: contextData != null,
    handleContextDataChanged,
    handleGameConfigurationChanged,
  };
};

export default useMemoryGame;
