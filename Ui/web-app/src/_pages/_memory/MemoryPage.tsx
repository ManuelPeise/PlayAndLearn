import React from "react";
import { Grid } from "@mui/material";
import GenericGameSettingsBar from "../../_components/_settings/GenericGameSettingsBar";
import Loadingindicator from "../../_components/_loading/LoadingIndicator";
import { UseMemory } from "../../_hooks/useMemory";
import { useGameSettingsValidation } from "../../_hooks/useGameSettingsValidation";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import MemoryGameContainer from "./MemoryGameContainer";

const MemoryPage: React.FC = () => {
  const validator = useGameSettingsValidation();

  const { t } = useTranslation();
  const handler = UseMemory(validator);

  const pageTitle = React.useMemo(() => {
    return t("memory:memoryPageTitle");
  }, [t]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Loadingindicator isLoading={handler.isLoading} />
          <GenericGameSettingsBar
            settings={handler.settings}
            config={handler.pageData.gameConfiguration}
            marginTop={2}
            targetUrl="/memory/gameupload"
            pageData={handler.pageData}
            handleSettingsChanged={handler.handleSettingsChanged}
          />

          <MemoryGameContainer
            settings={handler.settings}
            isLoading={handler.isLoading}
            isValid={handler.validSettings}
            gameData={handler.gameData}
            onStartGame={handler.onStartGame}
            handleSettingsChanged={handler.handleSettingsChanged}
            handleIsloadingChanged={handler.handleIsloadingChanged}
          />
        </Grid>
      }
    />
  );
};

export default MemoryPage;
