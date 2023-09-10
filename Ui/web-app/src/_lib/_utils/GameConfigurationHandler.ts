import { GameTypeEnum } from "../_enums/GameTypeEnum";
import { IGameConfiguration } from "../_intefaces/IGameSettingsConfiguration";

export const getGameConfiguration = (
  gameType: GameTypeEnum
): IGameConfiguration => {
  switch (gameType) {
    case GameTypeEnum.Memory:
      return getMemoryConfiguration();
    default:
      throw Error;
  }
};

const getMemoryConfiguration = (): IGameConfiguration => {
  const config: IGameConfiguration = {
    hasLevel: true,
    hasTopic: true,
    hasFilePairs: true,
    defaultFilePairCount: 4,
    defaultLevel: 0,
    defaultTopicId: 1,
  };

  return config;
};

export const getRandomIndex = (arrayLength: number): number => {
  const randomIndex: number = Math.floor(Math.random() * arrayLength);

  return randomIndex;
};
