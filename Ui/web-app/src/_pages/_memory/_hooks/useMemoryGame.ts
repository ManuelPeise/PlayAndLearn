import React from "react";
import { UseApi } from "src/_hooks/useApi";
import { IMemoryGameContextData } from "../_intefaces/IMemoryGameContext";
import { IMemoryGameDataRequestModel } from "../_intefaces/IMemoryGameDataRequestModel";
import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";
import { MemoryGameHandler } from "../_handlers/MemoryGameHandler";
import { IMemoryCard } from "../_intefaces/IMemoryCard";

const loadingIndikatorKeyValues = [
  "getCards",
  "shuffleCards",
  "distributeCards",
];

const memoryGameUploadController = `${process.env.REACT_APP_API_URL}MemoryGame/`;

export interface IUseMemoryGameResult {
  isLoading: boolean;
  dataIsBound: boolean;
  contextData: IMemoryGameContextData | null;
  gameIsRunning: boolean;
  memoryCards: IMemoryCard[];
  loadingIndicatorkey: string;
  handleContextDataChanged: (model: IMemoryGameContextData) => void;
  handleGameConfigurationChanged: (
    gameConfiguration: IGameConfiguration
  ) => Promise<void>;
  handleStartGame: () => void;
}

const useMemoryGame = (): IUseMemoryGameResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [contextData, setContextData] =
    React.useState<IMemoryGameContextData | null>(null);
  const [gameIsRunning, setGameIsRunning] = React.useState<boolean>(false);
  const [memoryCards, setMemoryCards] = React.useState<IMemoryCard[]>([]);
  const [loadingIndicatorkey, setLoadingIndicatorkey] =
    React.useState<string>("");
  const handleIsLoadingChanged = React.useCallback((isLaoding: boolean) => {
    setIsLoading(isLaoding);
  }, []);

  const gameHandlerRef = React.useRef<MemoryGameHandler | null>(null);

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
    [memoryGameContextDataService]
  );

  const handleGameConfigurationChanged = React.useCallback(
    async (gameConfiguration: IGameConfiguration) => {
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

  const handleStartGame = React.useCallback(() => {
    if (contextData?.cards !== undefined) {
      const foregrounds = contextData.cards
        .filter((x) => x.fileType.toLocaleLowerCase().includes("foreground"))
        .map((card) => {
          return card.buffer;
        });

      const background = contextData.cards
        .filter((x) => x.fileType.toLocaleLowerCase().includes("background"))
        .map((card) => {
          return card.buffer;
        });

      gameHandlerRef.current = new MemoryGameHandler(
        foregrounds,
        background[0]
      );

      setGameIsRunning(true);
    }
  }, [contextData?.cards]);

  React.useEffect(() => {
    if (memoryGameContextDataService.response !== undefined) {
      setContextData(memoryGameContextDataService.response);
    }
    // eslint-disable-next-line
  }, [memoryGameContextDataService.response]);

  React.useEffect(() => {
    let index = 0;

    if (
      gameIsRunning &&
      gameHandlerRef.current != null &&
      gameHandlerRef.current.cards !== undefined
    ) {
      const timeOut = setInterval(() => {
        console.log("set cards count");
        if (index === 0) {
          gameHandlerRef.current?.getCards(8);
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
        } else if (index === 1) {
          gameHandlerRef.current?.shuffleCards();
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
        } else if (index === 2) {
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
          const cards = gameHandlerRef.current?.cards ?? [];
          setMemoryCards(cards);
        } else {
          setLoadingIndicatorkey("");
          clearInterval(timeOut);
        }
        console.log("TimeOut:", timeOut);
        index = index + 1;
      }, 0);
    }
  }, [gameIsRunning]);

  return {
    isLoading,
    contextData,
    dataIsBound: contextData != null,
    gameIsRunning,
    memoryCards,
    loadingIndicatorkey,
    handleContextDataChanged,
    handleGameConfigurationChanged,
    handleStartGame,
  };
};

export default useMemoryGame;
