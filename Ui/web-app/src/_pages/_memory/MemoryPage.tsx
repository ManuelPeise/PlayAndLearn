import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import useMemoryGame from "./_hooks/useMemoryGame";
import GenericGameSettingsBar from "src/_components/_settings/GenericGameSettingsBar";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";
import MemoryGameContainer from "./MemoryGameContainer";

const MemoryPage: React.FC = () => {
  // const validator = useGameSettingsValidation();

  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("memory:memoryPageTitle");
  }, [t]);

  const {
    isLoading,
    contextData,
    gameIsRunning,
    memoryCards,
    loadingIndicatorkey,
    handleStartGame,
    handleGameConfigurationChanged,
  } = useMemoryGame();

  // const [index, setIndex] = React.useState<number>(0);

  // const imgSrc = React.useMemo(() => {
  //   if (
  //     contextData?.cards[index] !== undefined &&
  //     contextData?.cards[index]?.buffer?.length > 0
  //   ) {
  //     const src = `data:image/jpeg;base64,${contextData.cards[index].buffer}`;

  //     return src;
  //   }

  //   return "";
  // }, [contextData, index]);

  if (contextData == null) {
    return null;
  }
  // {
  //   /* <img
  //           src={imgSrc}
  //           style={{ width: 400, height: 400 }}
  //           alt="TestCard"
  //         /> */
  // }
  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Loadingindicator isLoading={isLoading} />
          <GenericGameSettingsBar
            readonly={isLoading || gameIsRunning}
            marginTop={2}
            targetUrl="/memory/gameupload"
            contextData={contextData}
            handleGameConfigurationChanged={handleGameConfigurationChanged}
          />
          {!gameIsRunning && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button disabled={isLoading} onClick={handleStartGame}>
                Start!
              </button>
            </div>
          )}
          {gameIsRunning && (
            <div>
              <label>{loadingIndicatorkey}</label>
            </div>
          )}
          <MemoryGameContainer isLoading={isLoading} cards={memoryCards} />
        </Grid>
      }
    />
  );
};

export default MemoryPage;
