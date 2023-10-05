import { FormLabel, Grid } from "@mui/material";
import React from "react";
import { IMemorySettings } from "../_interfaces/IMemorySettings";
import MemoryGameState from "./MemoryGameState";
import MemorySettingsBar from "./MemorySettingsBar";
import MemoryCardGrid from "./MemoryCardGrid";
import { UseMemoryGameHandler } from "../_hooks/useMemoryGameHandler";
import MemoryLoadingIndicator from "./MemoryLoadingIndicator";
import MemoryGameResultDialog from "./MemoryGameResultDialog";
import MemorySwitchPlayerDialog from "./MemorySwitchPlayerDialog";
import MemorySinglePlayerResultDialog from "./MemorySinglePlayerResultDialog";
import MemoryHighScoreList from "./MemoryHighScoreList";
import MemoryGameUploadDialog from "./MemoryGameUploadDialog";
import "../_style/memory-base.css";
import { useTranslation } from "react-i18next";
interface IProps {
  settings: IMemorySettings;
  handleSettingsChanged: (settings: Partial<IMemorySettings>) => void;
  handleIsLoadingChanged: (isLoading: boolean) => void;
}

const MemoryPlayGround: React.FC<IProps> = (props) => {
  const { settings, handleIsLoadingChanged, handleSettingsChanged } = props;
  const { t } = useTranslation();
  const {
    memoryCards,
    choiceOne,
    choiceTwo,
    loadingIndicatorkey,
    memoryLoadingIndicatorVisible,
    switchPlayerDialogOpen,
    currentPlayer,
    showGameState,
    showGameResult,
    players,
    showRatingDialog,
    singlePlayerRating,
    singlePlayerAttemts,
    showMemoryUploadDialog,
    handleCloseRatingDialog,
    handleHideGameResult,
    handleSwitchPlayerDialogClose,
    handleChoice,
    startGame,
    handleShowMemoryUploadDialog,
    handleHideMemoryUploadDialog,
  } = UseMemoryGameHandler(
    settings,
    handleIsLoadingChanged,
    handleSettingsChanged
  );

  const handleStartGame = React.useCallback(async () => {
    startGame();
  }, [startGame]);

  const labelAddGameDescription = React.useMemo(() => {
    return t("memory:labelAddGame");
  }, [t]);

  const linkAddGame = React.useMemo(() => {
    return t("memory:labelUploadGame");
  }, [t]);

  return (
    <Grid>
      {!settings.isRunning && (
        <MemorySettingsBar
          settings={settings}
          handleIsLoading={handleIsLoadingChanged}
          handleSettingsChanged={handleSettingsChanged}
          handleStartGame={handleStartGame}
        />
      )}
      {memoryLoadingIndicatorVisible && (
        <MemoryLoadingIndicator value={loadingIndicatorkey} marginTop={5} />
      )}
      {showGameState && memoryCards.length > 0 && (
        <MemoryGameState players={settings.players} />
      )}
      {!memoryLoadingIndicatorVisible && settings.isRunning && memoryCards && (
        <MemoryCardGrid
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          cards={memoryCards}
          isAi={currentPlayer?.isAiPlayer ?? false}
          handleChoice={handleChoice}
        />
      )}
      {!settings.isRunning && (
        <MemoryHighScoreList
          gameIsRunning={settings.isRunning}
          handleIsLoadingChanged={handleIsLoadingChanged}
        />
      )}
      {!settings.isRunning && (
        <Grid className="form-link-container" container>
          <FormLabel
            className="form-link-description-text"
            onClick={handleShowMemoryUploadDialog}
          >
            {labelAddGameDescription}
            <span className="form-link">{linkAddGame}</span>
          </FormLabel>
        </Grid>
      )}
      <MemorySwitchPlayerDialog
        open={switchPlayerDialogOpen}
        nextPlayerName={currentPlayer?.name ?? ""}
        handleClose={handleSwitchPlayerDialogClose}
      />
      {showGameResult && (
        <MemoryGameResultDialog
          players={players}
          open={showGameResult}
          handleClose={handleHideGameResult}
          handleRestart={handleStartGame}
        />
      )}
      {settings.selectedPlayerMode === 1 && showRatingDialog && (
        <MemorySinglePlayerResultDialog
          open={showRatingDialog}
          rating={singlePlayerRating ?? []}
          attemts={singlePlayerAttemts}
          handleSaveScoreAndCloseDialog={handleCloseRatingDialog}
        />
      )}

      {showMemoryUploadDialog && (
        <MemoryGameUploadDialog
          open={showMemoryUploadDialog}
          handleClose={handleHideMemoryUploadDialog}
        />
      )}
    </Grid>
  );
};

export default MemoryPlayGround;
