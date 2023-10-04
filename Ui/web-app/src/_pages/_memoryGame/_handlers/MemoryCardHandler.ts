import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { IMemoryCard } from "../_interfaces/IMemoryCard";
import { IAiMove } from "../_interfaces/IAiMove";

export class MemoryCardHandler {
  private _cardImages: string[];
  private _cardIds: number[] = [];
  private _cards: IMemoryCard[];
  private _aiBrain: IMemoryCard[] = [];

  constructor(cardImages: string[]) {
    this._cardImages = cardImages;
    this._cards = this._cardImages.map((card, index) => {
      return {
        cardId: index,
        fieldId: index,
        foreground: card,
        matched: false,
      };
    });
  }

  public get cards(): IMemoryCard[] {
    return this._cards;
  }

  public get aiBrain(): IMemoryCard[] {
    return this._aiBrain;
  }

  public getCards(cardsCount: number) {
    this._cards = this._cardImages.map((card, index) => {
      return {
        cardId: index,
        fieldId: index,
        foreground: card,
        matched: false,
      };
    });
    this._cardIds = this.getSelectedCardIds(this._cards, cardsCount);
  }

  public getCardIds(cardsCount: number) {
    this._cardIds = this.getSelectedCardIds(this._cards, cardsCount);
  }

  public shuffleCards() {
    this._cards = this.getShuffledCards(this._cards, this._cardIds);
  }

  public initializeAiBrain(cards: IMemoryCard[]) {
    this._aiBrain = cards;
  }

  public appendAiBrain(card: IMemoryCard) {
    if (
      this._aiBrain.findIndex((brain) => brain.cardId === card.cardId) === -1
    ) {
      this._aiBrain.push(card);
    }
  }

  public removeCardFromBrain(card: IMemoryCard) {
    const index = this._aiBrain.findIndex((x) => x.fieldId === card.fieldId);
    if (index !== -1) {
      this._aiBrain.splice(index, 1);
    }
  }

  public executeAiMove(availableCards: IMemoryCard[]): IAiMove {
    if (availableCards.length === 0) {
      return {
        choiceOne: null,
        choiceTwo: null,
        isRunnung: false,
      };
    }

    const cards = availableCards.filter((card) => !card.matched);

    const choiceOneCardIndex = getRandomIndex(cards.length);
    const choiceOne = cards[choiceOneCardIndex];

    let choiceTwo = this.tryGetCardFromBrain(
      choiceOne.cardId,
      choiceOne.fieldId
    );

    if (choiceTwo == null) {
      const availableChoices = cards.filter(
        (card) => card.fieldId !== choiceOne.fieldId
      );

      let choiceTwoIndex;

      do {
        choiceTwoIndex = getRandomIndex(availableChoices.length);
        choiceTwo = availableChoices[choiceTwoIndex];
      } while (
        choiceTwo == null &&
        choiceOne.fieldId === availableChoices[choiceTwoIndex].fieldId
      );

      return {
        choiceOne: choiceOne,
        choiceTwo: choiceTwo,
        isRunnung:
          availableChoices.filter(
            (card) =>
              card.fieldId !== choiceOne.fieldId &&
              card.fieldId !== choiceTwo?.fieldId
          ).length > 0,
      };
    }
    return {
      choiceOne: choiceOne,
      choiceTwo: choiceTwo,
      isRunnung:
        cards.filter(
          (card) =>
            card.fieldId !== choiceOne.fieldId &&
            card.fieldId !== choiceTwo?.fieldId
        ).length > 0,
    };
  }
  //#region  private

  private tryGetCardFromBrain(cardId: number, fieldId: number) {
    if (this._aiBrain.length > 0) {
      const cardIndex = this._aiBrain.findIndex(
        (card) => card.cardId === cardId && card.fieldId !== fieldId
      );

      if (cardIndex !== -1) {
        return this._aiBrain[cardIndex];
      }
    }

    return null;
  }
  private getSelectedCardIds(
    cards: IMemoryCard[],
    cardsCount: number
  ): number[] {
    const cardIds: number[] = [];

    do {
      const index = getRandomIndex(cards.length);
      if (
        cards.findIndex((x) => x.cardId === index) !== -1 &&
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
    const selectedCards = cards.filter((card) => cardIds.includes(card.cardId));

    const douplicatedCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, fieldId: index }));

    return douplicatedCards;
  }

  //#region
}
