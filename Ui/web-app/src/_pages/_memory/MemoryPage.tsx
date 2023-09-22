import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageLayout from "../PageLayout";
import useMemoryGame from "./_hooks/useMemoryGame";
import GenericGameSettingsBar from "src/_components/_settings/GenericGameSettingsBar";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";
import MemoryGameContainer from "./MemoryGameContainer";
import InputButton from "src/_components/_input/InputButton";
import MemoryLoadingIndicator from "./_components/MemoryLoadingIndicator";

const MemoryPage: React.FC = () => {
  // const validator = useGameSettingsValidation();

  const { t } = useTranslation();

  const {
    isLoading,
    contextData,
    gameIsRunning,
    memoryCards,
    choiceOne,
    choiceTwo,
    attemts,
    gameResultDualogOpen,
    rateing,
    loadingIndicatorkey,
    memoryLoadingIndicatorVisible,
    currentPlayerKey,
    handleGameResultDialogClose,
    handleChoice,
    handleStartGame,
    handleGameConfigurationChanged,
  } = useMemoryGame();

  const pageTitle = React.useMemo(() => {
    return t("memory:memoryPageTitle");
  }, [t]);

  const loadingIndicatorValue = React.useMemo(() => {
    return t(`memory:${loadingIndicatorkey}`);
  }, [t, loadingIndicatorkey]);

  const currentPlayerLabel = React.useMemo(() => {
    if (!currentPlayerKey || currentPlayerKey === "") {
      return undefined;
    }

    return t(`memory:${currentPlayerKey}`);
  }, [currentPlayerKey, t]);

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
            readonly={isLoading || gameIsRunning}
            marginTop={2}
            targetUrl="/memory/gameupload"
            hasTopicDropDown={contextData.gameConfiguration.hasTopicSelection}
            hasLevelDropDown={contextData.gameConfiguration.hasLevelSelection}
            hasPlayerDropDown={contextData.gameConfiguration.hasPlayerSelection}
            topics={contextData.topicItems}
            levels={contextData.levelItems}
            players={contextData.playerItems}
            selectedPlayer={contextData.gameConfiguration.selectedPlayer}
            selectedLevel={contextData.gameConfiguration.selectedLevel}
            selectedTopic={contextData.gameConfiguration.selectedTopic}
            gameConfiguration={contextData.gameConfiguration}
            handleGameConfigurationChanged={handleGameConfigurationChanged}
          />
          {!gameIsRunning && (
            <InputButton
              marginTop={2}
              buttonType="button"
              variant="contained"
              text="Start Game"
              handleClick={handleStartGame}
              readonly={
                isLoading ||
                contextData?.gameConfiguration.selectedTopic === 0 ||
                contextData.gameConfiguration.selectedLevel === 0
              }
            />
          )}
          {memoryLoadingIndicatorVisible && (
            <MemoryLoadingIndicator
              marginTop={5}
              value={loadingIndicatorValue}
            />
          )}
          {gameIsRunning && (
            <MemoryGameContainer
              isLoading={isLoading}
              cards={memoryCards}
              choiseOne={choiceOne}
              choiseTwo={choiceTwo}
              attemts={attemts}
              rating={rateing}
              resultDialogOpen={gameResultDualogOpen}
              currentPlayerLabel={currentPlayerLabel}
              gameIsRunning={gameIsRunning}
              memoryLoadingIndicatorVisible={memoryLoadingIndicatorVisible}
              handleResultDialogClose={handleGameResultDialogClose}
              handleChoice={handleChoice}
            />
          )}
        </Grid>
      }
    />
  );
};

export default MemoryPage;
