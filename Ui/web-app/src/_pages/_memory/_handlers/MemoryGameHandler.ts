import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { IMemoryCard } from "../_intefaces/IMemoryCard";

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
      };
    });
    this._cardIds = this.getSelectedCardIds(this._cards, cardsCount);
  }

  public shuffleCards() {
    this._cards = this.getShuffledCards(this._cards, this._cardIds);
  }

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
      .map((card) => ({ ...card, key: Math.random() }));

    return douplicatedCards;
  }
  //#endregion
}
