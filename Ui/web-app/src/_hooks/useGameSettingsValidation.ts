import React from "react";
import { IGameSettings } from "../_lib/_intefaces/IGameSettings";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";

export interface IGameSettingsValidationResult {
  isValid: boolean;
  validate: (settings: IGameSettings, gameType: GameTypeEnum) => void;
}

export const useGameSettingsValidation = (): IGameSettingsValidationResult => {
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const validateMemorySettings = React.useCallback(
    (settings: IGameSettings) => {
      setIsValid(
        settings.level !== 0 && settings.player !== 0 // && settings.topic !== 0
      );
    },
    []
  );

  const validate = React.useCallback(
    (settings: IGameSettings, gameType: GameTypeEnum) => {
      switch (gameType) {
        case GameTypeEnum.Memory:
          validateMemorySettings(settings);
      }
    },
    [validateMemorySettings]
  );

  return {
    isValid,
    validate,
  };
};
