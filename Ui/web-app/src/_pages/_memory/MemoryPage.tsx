import React from "react";
import { Grid } from "@mui/material";
import GenericGameSettingsBar from "../../_components/_settings/GenericGameSettingsBar";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";
import { getGameConfiguration } from "../../_lib/_utils/GameConfigurationHandler";
import { useGameSettingsValidation } from "../../_hooks/useGameSettingsValidation";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import Loadingindicator from "../../_components/_loading/LoadingIndicator";

const MemoryPage: React.FC = () => {
  const configuration = getGameConfiguration(GameTypeEnum.Memory);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<IGameSettings>({
    topic: configuration.defaultTopic,
    level: configuration.defaultLevel,
    pairs: configuration.defaultFilePairCount,
  });

  const validator = useGameSettingsValidation();

  const handleSettingsChanged = React.useCallback(
    (settings: IGameSettings) => {
      setSettings(settings);
      validator.validate(settings, GameTypeEnum.Memory);
    },
    [validator]
  );

  const handleIsloadingChanged = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      <Loadingindicator isLoading={isLoading} />
      <GenericGameSettingsBar
        settings={settings}
        config={configuration}
        gameType={GameTypeEnum.Memory}
        marginTop={2}
        handleIsLoadingChanged={handleIsloadingChanged}
        handleSettingsChanged={handleSettingsChanged}
      />
    </Grid>
  );
};

export default MemoryPage;
