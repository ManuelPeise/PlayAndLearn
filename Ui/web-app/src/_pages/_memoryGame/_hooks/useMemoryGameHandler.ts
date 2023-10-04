import React from "react";
import { IMemoryFileMapping } from "../_interfaces/IMemoryFileMapping";
import { UseApi } from "src/_hooks/useApi";
import { IMemorySettings } from "../_interfaces/IMemorySettings";
import { MemoryCardHandler } from "../_handlers/MemoryCardHandler";
import { IMemoryCard } from "../_interfaces/IMemoryCard";
import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { IMemoryPlayer } from "../_interfaces/IMemoryPlayer";
import { IStar } from "src/_lib/_intefaces/IRate";
import { IMemoryHighScore } from "../_interfaces/IMemoryHighScore";

const controller = `${process.env.REACT_APP_API_URL}Memory/`;
const loadingIndikatorKeyValues = [
  "getCards",
  "shuffleCards",
  "distributeCards",
];

export const UseMemoryGameHandler = (
  settings: IMemorySettings,
  handleIsLoading: (isloading: boolean) => void,
  handleSettingsChanged: (settings: Partial<IMemorySettings>) => void
) => {
  const memoryCardService = UseApi<IMemoryFileMapping[]>(handleIsLoading);
  const ratingService = UseApi(handleIsLoading);

  const [cardMappings, setCardMappings] = React.useState<IMemoryFileMapping[]>(
    [] as IMemoryFileMapping[]
  );
  const [memoryCards, setMemoryCards] = React.useState<IMemoryCard[]>([]);
  const [cardHandler, setCardHandler] =
    React.useState<MemoryCardHandler | null>(null);
  const [choiceOne, setChoiceOne] = React.useState<IMemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = React.useState<IMemoryCard | null>(null);
  const [memoryLoadingIndicatorVisible, setMemoryLoadingIndicatorVisible] =
    React.useState<boolean>(false);
  const [loadingIndicatorkey, setLoadingIndicatorkey] =
    React.useState<string>("");
  const [currentPlayer, setCurrentPlayer] =
    React.useState<IMemoryPlayer | null>(null);
  const [showGameState, setShowGameState] = React.useState<boolean>(false);
  const [showGameResult, setShowGameResult] = React.useState<boolean>(false);
  const [switchPlayerDialogOpen, setSwitchPlayerDialogOpen] =
    React.useState<boolean>(false);
  const [singlePlayerAttemts, setSinglePlayerAttemts] =
    React.useState<number>(0);
  const [rateing, setRateing] = React.useState<IStar[] | null>(null);
  const [showRatingDialog, setShowRatingDialog] =
    React.useState<boolean>(false);

  const [showMemoryUploadDialog, setShowMemoryUploadDialog] =
    React.useState<boolean>(false);

  const handleShowMemoryUploadDialog = React.useCallback(() => {
    setShowMemoryUploadDialog(true);
  }, []);

  const handleHideMemoryUploadDialog = React.useCallback(() => {
    setShowMemoryUploadDialog(false);
  }, []);

  const loadCards = React.useCallback(async () => {
    await memoryCardService.fetchData(
      `${controller}GetMemoryCards?topicId=${settings.selectedTopic}`,
      ``,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": `application/json`,
        },
      }
    );
  }, [memoryCardService, settings.selectedTopic]);

  const getDefaultRateing = React.useCallback((): IStar[] => {
    const stars: IStar[] = [];

    for (let i = 0; i < 5; i++) {
      stars.push({ color: "transparent" });
    }

    return stars;
  }, []);

  const getGameRating = React.useCallback((attemts: number, level: number) => {
    if (level === 1) {
      if (attemts > 36) {
        return 1;
      } else if (attemts > 32) {
        return 2;
      } else if (attemts > 26) {
        return 3;
      } else if (attemts > 22) {
        return 4;
      } else {
        return 5;
      }
    } else if (level === 2) {
      if (attemts > 32) {
        return 1;
      } else if (attemts > 28) {
        return 2;
      } else if (attemts > 24) {
        return 3;
      } else if (attemts > 20) {
        return 4;
      } else {
        return 5;
      }
    } else if (level === 3) {
      if (attemts > 28) {
        return 1;
      } else if (attemts > 23) {
        return 2;
      } else if (attemts > 19) {
        return 3;
      } else if (attemts > 15) {
        return 4;
      } else {
        return 5;
      }
    }
  }, []);

  const startGame = React.useCallback(async () => {
    await loadCards();
    setSinglePlayerAttemts(0);
    const players = settings.players.map((player) => {
      return { ...player, cards: [] };
    });
    if (settings.selectedPlayerMode === 1) {
      setRateing(getDefaultRateing());
      setShowGameResult(false);
    }
    setShowGameResult(false);
    handleSettingsChanged({ isRunning: true, players: players });
  }, [
    settings.players,
    settings.selectedPlayerMode,
    loadCards,
    handleSettingsChanged,
    getDefaultRateing,
  ]);

  const resetChoice = React.useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
  }, []);

  const handleChoice = React.useCallback(
    (card: IMemoryCard) => {
      // add selected card to ai brain...
      if (settings.selectedPlayerMode === 2) {
        const value = getRandomIndex(10);

        if (value % 2 === 0) {
          cardHandler?.appendAiBrain(card);
        }
      }

      if (choiceOne) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    },
    [choiceOne, settings.selectedPlayerMode, cardHandler]
  );

  const handleAiMove = React.useCallback(
    (cards: IMemoryCard[]): boolean => {
      let index = 0;
      let isRunning = true;
      resetChoice();
      const availableCards = cards.filter((card) => !card.matched);

      if (cardHandler != null) {
        const aiResult = cardHandler.executeAiMove(availableCards);
        isRunning = aiResult.isRunnung;
        const aiMoveInterval = setInterval(() => {
          if (index === 0) {
            setChoiceOne(aiResult.choiceOne);
          } else if (index === 1) {
            setChoiceTwo(aiResult.choiceTwo);
          } else {
            clearInterval(aiMoveInterval);
          }
          index = index + 1;
        }, 1000);
      }

      return isRunning;
    },
    [cardHandler, resetChoice]
  );

  const getAiBrainCards = React.useCallback(
    (memoryCards: IMemoryCard[], cardsCount: number) => {
      const cards: IMemoryCard[] = [];

      do {
        let random = getRandomIndex(memoryCards.length);
        const index = cards.findIndex(
          (x) => x.fieldId === memoryCards[random]?.fieldId
        );

        if (cards.length === 0 || index === -1) {
          cards.push(memoryCards[random]);
        }
      } while (cards.length < cardsCount);

      return cards;
    },
    []
  );

  const switchCurrentPlayer = React.useCallback(() => {
    if (settings.selectedPlayerMode === 1) {
      setCurrentPlayer(settings.players[0]);

      return;
    }

    if (
      settings.selectedPlayerMode === 2 ||
      settings.selectedPlayerMode === 3
    ) {
      if (currentPlayer == null) {
        const index = getRandomIndex(settings.players.length);
        setCurrentPlayer(settings.players[index]);
      } else {
        const nextPlayerIndex = settings.players.findIndex(
          (p) => p.playerId === currentPlayer.playerId
        );

        if (nextPlayerIndex !== -1) {
          setCurrentPlayer(settings.players[nextPlayerIndex === 0 ? 1 : 0]);
        }
      }
    }
  }, [settings.players, currentPlayer, settings.selectedPlayerMode]);

  const initializeAi = React.useCallback(
    (cardHandler: MemoryCardHandler, cards: IMemoryCard[]) => {
      if (settings.selectedPlayerMode === 2) {
        switch (settings.selectedLevel) {
          case 1:
            cardHandler.initializeAiBrain(getAiBrainCards(cards, 4));
            break;
          case 2:
            cardHandler.initializeAiBrain(getAiBrainCards(cards, 8));
            break;
          case 3:
            cardHandler.initializeAiBrain(getAiBrainCards(cards, 12));
            break;
        }
      }
    },
    [settings.selectedPlayerMode, settings.selectedLevel, getAiBrainCards]
  );

  const handleSwitchPlayerDialogOpen = React.useCallback(() => {
    if (
      settings.selectedPlayerMode === 2 ||
      settings.selectedPlayerMode === 3
    ) {
      switchCurrentPlayer();
      setSwitchPlayerDialogOpen(true);
    }
  }, [settings.selectedPlayerMode, switchCurrentPlayer]);

  const handleSwitchPlayerDialogClose = React.useCallback(() => {
    if (settings.selectedPlayerMode === 2 && currentPlayer?.isAiPlayer) {
      handleAiMove(memoryCards);
    }

    setSwitchPlayerDialogOpen(false);
  }, [
    settings.selectedPlayerMode,
    currentPlayer?.isAiPlayer,
    memoryCards,
    handleAiMove,
  ]);

  const handleHideGameResult = React.useCallback(async () => {
    setShowGameResult(false);
    setMemoryCards([]);
    handleSettingsChanged({
      selectedLevel: 0,
      selectedTopic: 0,
      selectedPlayerMode: 0,
      players: [],
      isRunning: false,
    });
    // eslint-disable-next-line
  }, []);

  const handleCloseRatingDialog = React.useCallback(async () => {
    setShowRatingDialog(false);
    setMemoryCards([]);
    handleSettingsChanged({
      selectedLevel: 0,
      selectedTopic: 0,
      selectedPlayerMode: 0,
      players: [],
      isRunning: false,
    });
    // eslint-disable-next-line
  }, []);

  const handleGameRating = React.useCallback(() => {
    const stars: IStar[] = [];
    const rating =
      getGameRating(singlePlayerAttemts, settings.selectedLevel) ?? 0;

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push({ color: "yellow" });
      } else {
        stars.push({ color: "transparent" });
      }
    }

    setRateing(stars);
    // eslint-disable-next-line
  }, [getGameRating, settings.selectedLevel]);

  React.useEffect(() => {
    if (memoryCardService.response !== undefined) {
      setCardMappings(memoryCardService.response);
    }
  }, [memoryCardService]);

  React.useEffect(() => {
    if (cardMappings.length) {
      const images = cardMappings.map((card) => {
        return card.buffer;
      });
      setCardHandler(new MemoryCardHandler(images));
    }
  }, [cardMappings, settings.selectedLevel]);

  React.useEffect(() => {
    if (settings.isRunning) {
      let index = 0;

      if (cardHandler) {
        let cards: IMemoryCard[] = [];
        setMemoryLoadingIndicatorVisible(true);
        const timeOut = setInterval(() => {
          if (index === 0) {
            cardHandler.getCards(8);
            setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
          } else if (index === 1) {
            cardHandler.shuffleCards();
            setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
          } else if (index === 2) {
            setLoadingIndicatorkey(loadingIndikatorKeyValues[index]);
            cards = cardHandler.cards ?? [];
          } else {
            setLoadingIndicatorkey("");
            setMemoryLoadingIndicatorVisible(false);
            setShowGameState(true);
            setMemoryCards(cards);
            clearInterval(timeOut);
            initializeAi(cardHandler, cards);
            switchCurrentPlayer();
            handleSwitchPlayerDialogOpen();
          }
          index = index + 1;
        }, 1000);
      }
    }
    // eslint-disable-next-line
  }, [cardHandler, getAiBrainCards, initializeAi]);

  React.useEffect(() => {
    if (choiceOne != null && choiceTwo != null) {
      setSinglePlayerAttemts(singlePlayerAttemts + 1);

      if (choiceOne.cardId === choiceTwo.cardId) {
        const cards = memoryCards.map((card) => {
          if (card.cardId === choiceOne.cardId) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });

        setMemoryCards(cards);

        currentPlayer?.cards.push(choiceOne);
        cardHandler?.removeCardFromBrain(choiceOne);
        cardHandler?.removeCardFromBrain(choiceTwo);

        resetChoice();

        if (
          settings.selectedPlayerMode === 2 &&
          currentPlayer?.isAiPlayer &&
          settings.isRunning
        ) {
          handleAiMove(cards);
        }

        if (
          cards.filter((card) => !card.matched).length === 0 &&
          settings.selectedPlayerMode !== 1
        ) {
          setShowGameState(false);
          setShowGameResult(true);
        }

        if (
          cards.filter((card) => !card.matched).length === 0 &&
          settings.selectedPlayerMode === 1
        ) {
          handleGameRating();

          const rate = getGameRating(
            singlePlayerAttemts,
            settings.selectedLevel
          );
          const model: IMemoryHighScore = {
            name: currentPlayer?.name ?? "Test",
            level: settings.selectedLevel,
            attemts: singlePlayerAttemts + 1,
            score: rate ?? 0,
          };

          ratingService.fetchData(`${controller}SaveHighscore`, "", {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(model),
          });

          setShowGameState(false);
          setShowRatingDialog(true);
        }
      } else {
        setTimeout(() => {
          resetChoice();
          handleSwitchPlayerDialogOpen();
        }, 1000);
      }
    }
    // eslint-disable-next-line
  }, [
    choiceOne,
    choiceTwo,
    memoryCards,
    memoryLoadingIndicatorVisible,
    loadingIndicatorkey,
    currentPlayer,
    settings.selectedPlayerMode,
    settings.isRunning,
    cardHandler,
    handleGameRating,
    handleSettingsChanged,
    handleSwitchPlayerDialogOpen,
    resetChoice,
    handleAiMove,
  ]);

  return {
    memoryCards,
    choiceOne,
    choiceTwo,
    memoryLoadingIndicatorVisible,
    loadingIndicatorkey,
    switchPlayerDialogOpen,
    currentPlayer,
    showGameState,
    showGameResult,
    players: settings.players,
    singlePlayerRating: rateing,
    singlePlayerAttemts,
    showRatingDialog,
    showMemoryUploadDialog,
    handleCloseRatingDialog,
    handleHideGameResult,
    switchCurrentPlayer,
    handleSwitchPlayerDialogClose,
    startGame,
    handleChoice,
    handleShowMemoryUploadDialog,
    handleHideMemoryUploadDialog,
  };
};
