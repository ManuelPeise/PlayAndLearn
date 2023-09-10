import React from "react";
import { Grid } from "@mui/material";
import GenericGameSettingsBar from "../../_components/_settings/GenericGameSettingsBar";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";
import Loadingindicator from "../../_components/_loading/LoadingIndicator";
import { UseMemory } from "../../_hooks/useMemory";
import { getGameConfiguration } from "../../_lib/_utils/GameConfigurationHandler";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import { useGameSettingsValidation } from "../../_hooks/useGameSettingsValidation";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import MemoryGameContainer from "./MemoryGameContainer";

const MemoryPage: React.FC = () => {
  const validator = useGameSettingsValidation();
  const configuration = getGameConfiguration(GameTypeEnum.Memory);
  const [settings, setSettings] = React.useState<IGameSettings>({
    topicId: configuration.defaultTopicId,
    level: configuration.defaultLevel,
    isRunning: false,
  });

  const { t } = useTranslation();
  const handler = UseMemory(settings, validator);

  const handleSettingsChanged = React.useCallback(
    (settings: IGameSettings) => {
      setSettings(settings);
      validator.validate(settings, GameTypeEnum.Memory);
    },
    [validator]
  );

  const pageTitle = React.useMemo(() => {
    return `${t("memory:memoryPageTitle")}${
      handler.gameData.topic !== undefined ? `- ${handler.gameData.topic}` : ""
    }`;
  }, [t, handler.gameData.topic]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Loadingindicator isLoading={handler.isLoading} />
          <GenericGameSettingsBar
            settings={settings}
            config={configuration}
            gameType={GameTypeEnum.Memory}
            marginTop={2}
            targetUrl="/memory/gameupload"
            handleIsLoadingChanged={handler.handleIsloadingChanged}
            handleSettingsChanged={handleSettingsChanged}
          />

          <MemoryGameContainer
            settings={settings}
            isLoading={handler.isLoading}
            handleSettingsChanged={handleSettingsChanged}
            handleIsloadingChanged={handler.handleIsloadingChanged}
          />
        </Grid>
      }
    />
  );
};

export default MemoryPage;
