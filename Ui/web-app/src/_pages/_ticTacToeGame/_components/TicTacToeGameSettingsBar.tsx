import React from "react";
import { ITicTacToeSettings } from "../_interfaces/ITicTacToeSettings";
import { Grid, SelectChangeEvent } from "@mui/material";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { useTranslation } from "react-i18next";
import InputDropdown from "src/_components/_input/InputDropDown";
import InputButton from "src/_components/_input/InputButton";
import TicTacToePlayerConfigDialog from "./TicTacToePlayerConfigDialog";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import {
  getLocalStorageItem,
  ticTacToePlayersStorageField,
} from "../_utils/localStorage";

const getMultiPlayerModePlayers = (): ITicTacToePlayer[] => {
  const players = getLocalStorageItem<ITicTacToePlayer[]>(
    ticTacToePlayersStorageField
  );

  return [
    players[0] ?? {
      id: 0,
      name: "",
      isAiPlayer: false,
      isMaxPlayer: false,
      value: "X",
    },
    players[1] ?? {
      id: 1,
      name: "",
      isAiPlayer: false,
      isMaxPlayer: false,
      value: "O",
    },
  ];
};

const getSinglePlayerModePlayers = (
  aiPlayerName: string
): ITicTacToePlayer[] => {
  const players = getLocalStorageItem<ITicTacToePlayer[]>(
    ticTacToePlayersStorageField
  );

  return [
    players[0] ?? {
      id: 0,
      name: "",
      isAiPlayer: false,
      isMaxPlayer: false,
      value: "X",
    },
    {
      id: 1,
      name: aiPlayerName,
      isAiPlayer: true,
      isMaxPlayer: false,
      value: "O",
    },
  ];
};

interface IProps {
  settings: ITicTacToeSettings;
  isRunning: boolean;
  onSettingsChanged: (settings: Partial<ITicTacToeSettings>) => void;
  handleStartGame: (isRunning: boolean) => void;
}

const TicTacToeSettingsBar: React.FC<IProps> = (props) => {
  const { settings, isRunning, onSettingsChanged, handleStartGame } = props;

  const { t } = useTranslation();

  const [playerSettingsOpen, setPlayerSettingsOpen] =
    React.useState<boolean>(false);

  const playerConfigButtonText = React.useMemo(() => {
    return t("tictactoe:titlePlayerConfig");
  }, [t]);

  const playerModeItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];

    items.push({ key: 0, value: t("tictactoe:labelSinglePlayer") });
    items.push({ key: 1, value: t("tictactoe:labelMultiPlayer") });

    return items;
  }, [t]);

  const levelItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];

    items.push({ key: 0, value: t("tictactoe:labelLevelEasy") });
    items.push({ key: 1, value: t("tictactoe:labelLevelMedium") });
    items.push({ key: 2, value: t("tictactoe:labelLevelHard") });

    return items;
  }, [t]);

  const startGameButtonText = React.useMemo(() => {
    return t("common:labelStartGame");
  }, [t]);

  const startGameDisabled = React.useMemo(() => {
    return (
      settings.players[0] === undefined ||
      settings.players[1] === undefined ||
      settings.players[0]?.name.length < 3 ||
      settings.players[1]?.name.length < 3 ||
      isRunning
    );
  }, [settings.players, isRunning]);

  const handlePlayerModeChanged = React.useCallback(
    (event: SelectChangeEvent) => {
      const value = parseInt(event.target.value);
      let currentPlayers: ITicTacToePlayer[];
      if (value === 0) {
        currentPlayers = getSinglePlayerModePlayers(
          t("tictactoe:labelAiPlayer")
        );
      } else {
        currentPlayers = getMultiPlayerModePlayers();
      }
      onSettingsChanged({ gameMode: value, players: currentPlayers });
    },
    [t, onSettingsChanged]
  );

  const handleLevelChanged = React.useCallback(
    (event: SelectChangeEvent) => {
      const value = parseInt(event.target.value);

      onSettingsChanged({ level: value });
    },
    [onSettingsChanged]
  );

  const handleOpenPlayerSettingsDialog = React.useCallback(() => {
    setPlayerSettingsOpen(true);
  }, []);

  const handleClosePlayerSettingsDialog = React.useCallback(() => {
    setPlayerSettingsOpen(false);
  }, []);

  const handleStart = React.useCallback(() => {
    handleStartGame(true);
  }, [handleStartGame]);

  return (
    <Grid className="tic-tac-toe-settings-bar">
      {/* players */}
      <Grid className="tic-tac-toe-settings-bar-item">
        <InputDropdown
          minWidth={5}
          items={playerModeItems}
          readOnly={isRunning}
          selectedKey={settings.gameMode ?? 0}
          disabledItems={[]}
          handleChange={handlePlayerModeChanged}
        />
      </Grid>
      {/* button for player settings */}
      <Grid className="tic-tac-toe-settings-bar-item">
        <InputButton
          buttonType="button"
          variant="outlined"
          text={playerConfigButtonText}
          readonly={isRunning}
          handleClick={handleOpenPlayerSettingsDialog}
        />
      </Grid>
      {/* level selection if single player mode */}
      <Grid className="tic-tac-toe-settings-bar-item">
        {settings.gameMode === 0 && (
          <InputDropdown
            minWidth={5}
            items={levelItems}
            readOnly={isRunning}
            selectedKey={settings.level ?? 0}
            disabledItems={[]}
            handleChange={handleLevelChanged}
          />
        )}
      </Grid>
      {/* start game button */}
      <Grid className="tic-tac-toe-settings-bar-item">
        <InputButton
          buttonType="button"
          variant="outlined"
          text={startGameButtonText}
          readonly={startGameDisabled}
          handleClick={handleStart}
        />
      </Grid>

      <TicTacToePlayerConfigDialog
        open={playerSettingsOpen}
        playerMode={settings.gameMode}
        players={settings.players}
        handleSettingsChanged={onSettingsChanged}
        handleClose={handleClosePlayerSettingsDialog}
      />
    </Grid>
  );
};

export default TicTacToeSettingsBar;
