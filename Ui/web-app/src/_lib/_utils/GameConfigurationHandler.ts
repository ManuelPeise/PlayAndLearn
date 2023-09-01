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
    defaultTopic: 0,
  };

  return config;
};
