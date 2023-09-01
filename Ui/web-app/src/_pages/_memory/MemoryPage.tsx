import React from "react";
import { Grid } from "@mui/material";
import GenericGameSettingsBar from "../../_components/_settings/GenericGameSettingsBar";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";
import { getGameConfiguration } from "../../_lib/_utils/GameConfigurationHandler";
import { useGameSettingsValidation } from "../../_hooks/useGameSettingsValidation";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";

const MemoryPage: React.FC = () => {
  const configuration = getGameConfiguration(GameTypeEnum.Memory);

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

  return (
    <Grid container justifyContent="center" style={{ padding: "16px" }}>
      <GenericGameSettingsBar
        settings={settings}
        config={configuration}
        gameType={GameTypeEnum.Memory}
        handleSettingsChanged={handleSettingsChanged}
      />
    </Grid>
  );
};

export default MemoryPage;
