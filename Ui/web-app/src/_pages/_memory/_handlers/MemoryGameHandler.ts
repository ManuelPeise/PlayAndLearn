import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { IMemoryCard } from "../_intefaces/IMemoryCard";
import { IStar } from "src/_lib/_intefaces/IRate";
import { IMemoryPlayer } from "../_intefaces/IMemoryPlayer";
import { IMemoryTrainingsData } from "../_intefaces/IMemoryTrainingsData";

export class MemoryGameHandler {
  private _binaryForegrounds: string[];
  private _cardBackground: string;
  private _cardIds: number[] = [];
  private _cards: IMemoryCard[] = [];

  constructor(cards: string[], background: string) {
    this._binaryForegrounds = cards;
    this._cardBackground = background;
  }

  public get cards(): IMemoryCard[] {
    return this._cards;
  }

  public getCards(cardsCount: number) {
    this._cards = this._binaryForegrounds.map((card, index) => {
      return {
        id: index,
        key: index,
        foreground: card,
        background: this._cardBackground,
        matched: false,
      };
    });
    this._cardIds = this.getSelectedCardIds(this._cards, cardsCount);
  }

  public shuffleCards() {
    this._cards = this.getShuffledCards(this._cards, this._cardIds);
  }

  public executeChoice(
    choiceOne: IMemoryCard,
    choiceTwo: IMemoryCard,
    cards: IMemoryCard[],
    attemts: number,
    timeoutSeconds: number,
    setAttemtsCallback: (attemts: number) => void,
    setMemoryCardsCallback: (cards: IMemoryCard[]) => void,
    resetChoiceCallback: () => void
  ): void {
    if (choiceOne != null && choiceTwo != null) {
      const attemtsUpdate = attemts + 1;
      setAttemtsCallback(attemtsUpdate);
      if (choiceOne.id === choiceTwo.id) {
        setMemoryCardsCallback(
          cards.map((card) => {
            if (card.id === choiceOne.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );

        resetChoiceCallback();
      } else {
        setTimeout(() => {
          resetChoiceCallback();
        }, timeoutSeconds);
      }
    }
  }

  public getRateing = (): IStar[] => {
    const stars: IStar[] = [];

    for (let i = 0; i < 5; i++) {
      stars.push({ color: "transparent" });
    }

    return stars;
  };

  public getPlayers(selectedMode: number) {
    const players: IMemoryPlayer[] = [];

    if (selectedMode === 1) {
      players.push({
        name: "playerOneKey",
        isAi: false,
        matches: 0,
        isCurrentPlayer: false,
      });
      players.push({
        name: "playerAiKey",
        isAi: true,
        matches: 0,
        isCurrentPlayer: false,
      });

      return players;
    }

    players.push({
      name: "playerOneKey",
      isAi: false,
      matches: 0,
      isCurrentPlayer: false,
    });
    players.push({
      name: "playerTwoKey",
      isAi: true,
      matches: 0,
      isCurrentPlayer: false,
    });

    return players;
  }

  public getGameRating = (attemts: number, level?: number) => {
    const selectedLevel = level ?? 0;
    if (selectedLevel === 1) {
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
    } else if (selectedLevel === 2) {
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
    } else if (selectedLevel === 3) {
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
  };

  public handleSaveTrainingsData = (
    data: IMemoryTrainingsData,
    url: string
  ) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": `application/json`,
      },
      body: JSON.stringify(data),
    });
  };

  //#region private members
  private getSelectedCardIds(
    cards: IMemoryCard[],
    cardsCount: number
  ): number[] {
    const cardIds: number[] = [];

    do {
      const index = getRandomIndex(cards.length);
      if (
        cards.findIndex((x) => x.id === index) !== -1 &&
        !cardIds.includes(index)
      ) {
        cardIds.push(index);
      }
    } while (cardIds.length < cardsCount);

    return cardIds;
  }

  private getShuffledCards(
    cards: IMemoryCard[],
    cardIds: number[]
  ): IMemoryCard[] {
    const selectedCards = cards.filter((card) => cardIds.includes(card.id));

    const douplicatedCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, key: index }));

    return douplicatedCards;
  }
  //#endregion
}
