import React from "react";
import { UseApi } from "src/_hooks/useApi";
import { IMemoryGameContextData } from "../_intefaces/IMemoryGameContext";
import { IMemoryGameDataRequestModel } from "../_intefaces/IMemoryGameDataRequestModel";
import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";
import { MemoryGameHandler } from "../_handlers/MemoryGameHandler";
import { IMemoryCard } from "../_intefaces/IMemoryCard";
import { IStar } from "src/_lib/_intefaces/IRate";
import { IMemoryPlayer } from "../_intefaces/IMemoryPlayer";
import { IPlayer } from "src/_lib/_intefaces/IPlayer";

const loadingIndikatorKeyValues = [
  "getCards",
  "shuffleCards",
  "distributeCards",
];

const memoryGameUploadController = `${process.env.REACT_APP_API_URL}MemoryGame/`;
const memoryAiController = `${process.env.REACT_APP_API_URL}MemoryAi/`;

export interface IUseMemoryGameResult {
  isLoading: boolean;
  dataIsBound: boolean;
  contextData: IMemoryGameContextData | null;
  gameIsRunning: boolean;
  memoryCards: IMemoryCard[];
  loadingIndicatorkey: string;
  choiceOne: IMemoryCard | null;
  choiceTwo: IMemoryCard | null;
  attemts: number;
  gameResultDualogOpen: boolean;
  rateing: IStar[] | null;
  memoryLoadingIndicatorVisible: boolean;
  currentPlayerKey: string;
  handleGameResultDialogClose: () => void;
  handleGameConfigurationChanged: (
    gameConfiguration: IGameConfiguration
  ) => Promise<void>;
  handleStartGame: () => void;
  handleChoice: (card: IMemoryCard) => void;
}

const useMemoryGame = (): IUseMemoryGameResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [contextData, setContextData] =
    React.useState<IMemoryGameContextData | null>(null);

  const [memoryCards, setMemoryCards] = React.useState<IMemoryCard[]>([]);
  const [memoryLoadingIndicatorVisible, setMemoryLoadingIndicatorVisible] =
    React.useState<boolean>(false);
  const [loadingIndicatorkey, setLoadingIndicatorkey] =
    React.useState<string>("");

  //#region game
  const [gameIsRunning, setGameIsRunning] = React.useState<boolean>(false);
  const [choiceOne, setChoiceOne] = React.useState<IMemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = React.useState<IMemoryCard | null>(null);
  const [attemts, setAttemts] = React.useState<number>(0);
  const [gameResultDualogOpen, setGameResultDualogOpen] =
    React.useState<boolean>(false);
  const [rateing, setRateing] = React.useState<IStar[] | null>(null);
  // TODO implment usage
  const [players, setPlayers] = React.useState<IMemoryPlayer[]>([]);
  const [currentPlayer, setCurrentPlayer] = React.useState<IPlayer>(
    {} as IPlayer
  );
  //#endregion

  const handleGameResultDialogClose = React.useCallback(() => {
    setGameResultDualogOpen(false);
    setGameIsRunning(false);
  }, []);

  const handleChoice = React.useCallback(
    (card: IMemoryCard) => {
      if (choiceOne) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    },
    [choiceOne]
  );

  const resetChoice = React.useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
  }, []);

  const handleIsLoadingChanged = React.useCallback((isLaoding: boolean) => {
    setIsLoading(isLaoding);
  }, []);

  const gameHandlerRef = React.useRef<MemoryGameHandler | null>(null);

  const currentPlayerKey = React.useMemo(() => {
    return currentPlayer?.name;
  }, [currentPlayer?.name]);

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
        selectedTopic: gameConfiguration.selectedTopic,
        selectedLevel: gameConfiguration.selectedLevel,
        selectedPlayer: gameConfiguration.selectedPlayer,
        isInitialLoad: false,
        gameType: GameTypeEnum.Memory,
      });
    },
    // eslint-disable-next-line
    [contextData, RefreshPageData]
  );

  const handleChangePlayer = React.useCallback(() => {
    const player = players.filter((p) => p?.name !== currentPlayer?.name);

    setCurrentPlayer(player[0]);
  }, [currentPlayer, players]);

  const handleChangeOnGameStartPlayer = React.useCallback(() => {
    setCurrentPlayer(players[0]);
  }, [players]);

  // start game
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

      const selectedPlayers = gameHandlerRef.current?.getPlayers(1);

      setPlayers(selectedPlayers);

      setRateing(gameHandlerRef.current?.getRateing() ?? []);

      setAttemts(0);
      setGameIsRunning(true);
    }
  }, [contextData]);

  // set context data after api call
  React.useEffect(() => {
    if (memoryGameContextDataService.response !== undefined) {
      setContextData(memoryGameContextDataService.response);
    }
    // eslint-disable-next-line
  }, [memoryGameContextDataService.response]);

  // shuffle cards
  React.useEffect(() => {
    let index = 0;

    if (
      gameIsRunning &&
      gameHandlerRef.current != null &&
      gameHandlerRef.current.cards !== undefined
    ) {
      let cards: IMemoryCard[] = [];
      const timeOut = setInterval(() => {
        setMemoryLoadingIndicatorVisible(true);
        if (index === 0) {
          gameHandlerRef.current?.getCards(8);
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
        } else if (index === 1) {
          gameHandlerRef.current?.shuffleCards();
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
        } else if (index === 2) {
          setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
          cards = gameHandlerRef.current?.cards ?? [];
        } else {
          setLoadingIndicatorkey("");
          setMemoryLoadingIndicatorVisible(false);
          setMemoryCards(cards);
          clearInterval(timeOut);
          handleChangeOnGameStartPlayer();
        }
        index = index + 1;
      }, 1000);
    }
  }, [gameIsRunning, handleChangeOnGameStartPlayer]);

  React.useEffect(() => {
    if (choiceOne != null && choiceTwo != null) {
      gameHandlerRef.current?.executeChoice(
        choiceOne,
        choiceTwo,
        memoryCards,
        attemts,
        1000,
        setAttemts,
        setMemoryCards,
        resetChoice
      );

      console.log("Player:", contextData?.gameConfiguration.selectedPlayer);
      if (contextData?.gameConfiguration.selectedPlayer === 3) {
        gameHandlerRef.current?.handleSaveTrainingsData(
          {
            choiceValue: `${choiceOne.key}_${choiceTwo.key}`,
            choiceOne: choiceOne.key,
            choiceTwo: choiceTwo.key,
            matched: choiceOne.id === choiceTwo.id,
          },
          `${memoryAiController}SaveMemoryTrainingsData`
        );
      }
    }
    // eslint-disable-next-line
  }, [memoryCards, choiceOne, choiceTwo, resetChoice]);

  React.useEffect(() => {
    if (memoryCards.filter((card) => card.matched === false)?.length === 0) {
      if (gameIsRunning) {
        const stars: IStar[] = [];
        const rate =
          gameHandlerRef.current?.getGameRating(
            attemts,
            contextData?.gameConfiguration.selectedLevel
          ) ?? 0;

        for (let i = 0; i < 5; i++) {
          if (i < rate) {
            stars.push({ color: "yellow" });
          } else {
            stars.push({ color: "transparent" });
          }
        }
        setMemoryCards([]);
        setRateing(stars);
        setGameResultDualogOpen(true);
      }
    }
    // eslint-disable-next-line
  }, [memoryCards]);

  return {
    isLoading,
    contextData,
    dataIsBound: contextData != null,
    gameIsRunning,
    memoryCards,
    choiceOne,
    choiceTwo,
    attemts,
    gameResultDualogOpen,
    rateing,
    loadingIndicatorkey,
    memoryLoadingIndicatorVisible,
    currentPlayerKey,
    handleGameResultDialogClose,
    handleGameConfigurationChanged,
    handleStartGame,
    handleChoice,
  };
};

export default useMemoryGame;
