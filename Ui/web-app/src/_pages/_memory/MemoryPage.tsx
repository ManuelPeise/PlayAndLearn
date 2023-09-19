import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import useMemoryGame from "./_hooks/useMemoryGame";
import GenericGameSettingsBar from "src/_components/_settings/GenericGameSettingsBar";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";

const MemoryPage: React.FC = () => {
  // const validator = useGameSettingsValidation();

  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("memory:memoryPageTitle");
  }, [t]);

  const { isLoading, contextData, handleGameConfigurationChanged } =
    useMemoryGame();

  const [index, setIndex] = React.useState<number>(0);

  const handleIndexChanged = React.useCallback(() => {
    console.log(contextData?.cards);
    if (
      contextData?.cards !== undefined &&
      index < contextData?.cards?.length - 1
    ) {
      const newIndex = index + 1;
      setIndex(newIndex);
    } else {
      setIndex(0);
    }

    console.log("index", index);
  }, [contextData?.cards, index]);

  const imgSrc = React.useMemo(() => {
    if (
      contextData?.cards[index] !== undefined &&
      contextData?.cards[index]?.buffer?.length > 0
    ) {
      const src = `data:image/jpeg;base64,${contextData.cards[index].buffer}`;

      return src;
    }

    return "";
  }, [contextData, index]);

  if (contextData == null) {
    return null;
  }

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Loadingindicator isLoading={isLoading} />
          <GenericGameSettingsBar
            marginTop={2}
            targetUrl="/memory/gameupload"
            contextData={contextData}
            handleGameConfigurationChanged={handleGameConfigurationChanged}
          />

          <img
            src={imgSrc}
            style={{ width: 400, height: 400 }}
            alt="TestCard"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleIndexChanged}>Click Me!</button>
          </div>
          {/* <MemoryGameContainer
              settings={handler.settings}
              isLoading={isLoading}
              isValid={handler.validSettings}
              gameData={handler.gameData}
              onStartGame={handler.onStartGame}
              handleSettingsChanged={handler.handleSettingsChanged}
              handleIsloadingChanged={handleIsLoadingChanged}
            /> */}
        </Grid>
      }
    />
  );
};

export default MemoryPage;
