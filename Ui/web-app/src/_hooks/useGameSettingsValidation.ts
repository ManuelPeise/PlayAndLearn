import React from "react";
import { GameTypeEnum } from "../_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";

export interface IGameConfigurationValidationResult {
  isValid: boolean;
  validate: (configuration: IGameConfiguration, gameType: GameTypeEnum) => void;
}

export const useGameConfigurationValidation =
  (): IGameConfigurationValidationResult => {
    const [isValid, setIsValid] = React.useState<boolean>(false);

    const validateMemoryConfiguration = React.useCallback(
      (configuration: IGameConfiguration) => {
        setIsValid(
          configuration.selectedLevel !== 0 &&
            configuration.selectedPlayer !== 0 &&
            configuration.selectedTopic !== 0
        );
      },
      []
    );

    const validate = React.useCallback(
      (configuration: IGameConfiguration, gameType: GameTypeEnum) => {
        switch (gameType) {
          case GameTypeEnum.Memory:
            validateMemoryConfiguration(configuration);
        }
      },
      [validateMemoryConfiguration]
    );

    return {
      isValid,
      validate,
    };
  };
