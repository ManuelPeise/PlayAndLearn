import React from "react";
import { Grid } from "@mui/material";
import GenericGameSettingsBar from "../../_components/_settings/GenericGameSettingsBar";
import Loadingindicator from "../../_components/_loading/LoadingIndicator";
import { UseMemory } from "../../_hooks/useMemory";
import { useGameSettingsValidation } from "../../_hooks/useGameSettingsValidation";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import MemoryGameContainer from "./MemoryGameContainer";
import useMemoryGame from "./_hooks/useMemoryGame";
import MemoryGameProvider, { MemoryGameContext } from "./MemoryGameContext";
import { IGameSettings } from "src/_lib/_intefaces/IGameSettings";

const MemoryPage: React.FC = () => {
  const validator = useGameSettingsValidation();

  const { t } = useTranslation();
  const { isLoading, pageData, handleIsLoadingChanged } =
    React.useContext(MemoryGameContext);

  const memoryHandler = useMemoryGame(handleIsLoadingChanged);

  const handler = UseMemory(validator);

  const pageTitle = React.useMemo(() => {
    return t("memory:memoryPageTitle");
  }, [t]);

  // TODO CHECK THIS [ADD SETTINGS TO PAGE DATA OBJECT]
  const gameSettings = React.useMemo((): IGameSettings => {
    return {
      topic: pageData.gameConfiguration.defaultTopic,
      level: pageData.gameConfiguration.defaultLevel,
      player: pageData.gameConfiguration.defaultPlayer,
      isRunning: false,
    };
  }, [pageData.gameConfiguration]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <MemoryGameProvider>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            <Loadingindicator isLoading={isLoading} />
            <GenericGameSettingsBar
              settings={gameSettings}
              config={handler.pageData.gameConfiguration}
              marginTop={2}
              targetUrl="/memory/gameupload"
              pageData={handler.pageData}
              handleSettingsChanged={handler.handleSettingsChanged}
            />

            <MemoryGameContainer
              settings={handler.settings}
              isLoading={isLoading}
              isValid={handler.validSettings}
              gameData={handler.gameData}
              onStartGame={handler.onStartGame}
              handleSettingsChanged={handler.handleSettingsChanged}
              handleIsloadingChanged={handleIsLoadingChanged}
            />
          </Grid>
        </MemoryGameProvider>
      }
    />
  );
};

export default MemoryPage;
