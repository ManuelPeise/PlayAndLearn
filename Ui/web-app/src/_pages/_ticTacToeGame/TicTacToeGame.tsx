import React from "react";
import PageLayout from "../PageLayout";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@mui/material";
import TicTacToeSettingsBar from "./_components/TicTacToeGameSettingsBar";
import { ITicTacToeSettings } from "./_interfaces/ITicTacToeSettings";
import TicTacToePlayerInfo from "./_components/TicTaxToePlayerInfo";
import TicTacToeBoard from "./_components/TicTacToeBoard";
import { ITicTacToePlayer } from "./_interfaces/ITicTacToePlayer";
import { generateFields } from "./_utils/fieldUtils";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  ticTacToePlayersStorageField,
  ticTacToegameModeStorageField,
  ticTacToepLevelStorageField,
} from "./_utils/localStorage";
import { getStartPlayer } from "./_utils/playerUtils";
import "./_style/ticTacToe.css";

const TicTacToeGame: React.FC = () => {
  const { t } = useTranslation();

  const [settings, setSettings] = React.useState<ITicTacToeSettings>({
    level: getLocalStorageItem<number>(ticTacToepLevelStorageField) ?? 0,
    gameMode: getLocalStorageItem<number>(ticTacToegameModeStorageField) ?? 0,
    players: getLocalStorageItem<ITicTacToePlayer[]>(
      ticTacToePlayersStorageField
    ),
    gameIsRunning: false,
    currentPlayer: {} as ITicTacToePlayer,
    fields: [],
    playedFieldIds: [],
  });

  const pageTitle = React.useMemo(() => {
    return t("tictactoe:pageTitle");
  }, [t]);

  const handleSettingsChanged = React.useCallback(
    (partiaSettings: Partial<ITicTacToeSettings>) => {
      const currentState = { ...settings, ...partiaSettings };
      setSettings(currentState);
      setLocalStorageItem(
        ticTacToegameModeStorageField,
        JSON.stringify(currentState.gameMode)
      );
      setLocalStorageItem(
        ticTacToepLevelStorageField,
        JSON.stringify(currentState.level)
      );
    },
    [settings, setSettings]
  );

  const handleStartGame = React.useCallback(
    (isRunning: boolean) => {
      handleSettingsChanged({
        gameIsRunning: isRunning,
        currentPlayer: getStartPlayer(settings.players),
        fields: generateFields(false),
      });
    },
    [settings, handleSettingsChanged]
  );

  const handleGameOver = React.useCallback(() => {
    handleSettingsChanged({
      gameIsRunning: false,
      fields: settings.fields.map((field) => {
        field.readonly = true;
        return field;
      }),
    });
  }, [settings.fields, handleSettingsChanged]);

  const handleResetGameState = React.useCallback(() => {
    handleSettingsChanged({ gameIsRunning: false, playedFieldIds: [] });
  }, [handleSettingsChanged]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid className="tic-tac-toe-page-container">
          <Container>
            <TicTacToeSettingsBar
              settings={settings}
              isRunning={settings.gameIsRunning}
              onSettingsChanged={handleSettingsChanged}
              handleStartGame={handleStartGame}
            />
            <TicTacToePlayerInfo
              isRunning={settings.gameIsRunning}
              currentPlayer={settings.currentPlayer.name}
            />
            <TicTacToeBoard
              selectedFields={settings.playedFieldIds}
              currentPlayer={settings.currentPlayer}
              isRunning={settings.gameIsRunning}
              players={settings.players}
              level={settings.level}
              fields={settings.fields}
              handleSettingsChanged={handleSettingsChanged}
              handleResetGameState={handleResetGameState}
              handleGameOver={handleGameOver}
            />
          </Container>
        </Grid>
      }
    />
  );
};

export default TicTacToeGame;
