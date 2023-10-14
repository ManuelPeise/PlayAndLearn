import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "../_style/ticTacToeDialog.css";
import InputButton from "src/_components/_input/InputButton";
import InputTextField from "src/_components/_input/InputTextField";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import { ITicTacToeSettings } from "../_interfaces/ITicTacToeSettings";
import {
  ticTacToePlayersStorageField,
  setLocalStorageItem,
} from "../_utils/localStorage";

interface IProps {
  open: boolean;
  playerMode: number;
  players: ITicTacToePlayer[];
  handleSettingsChanged: (settings: Partial<ITicTacToeSettings>) => void;
  handleClose: () => void;
}

const TicTacToePlayerConfigDialog: React.FC<IProps> = (props) => {
  const { open, playerMode, players, handleSettingsChanged, handleClose } =
    props;
  const { t } = useTranslation();

  const title = React.useMemo(() => {
    return t("tictactoe:titlePlayerConfig");
  }, [t]);

  const aiPlayerLabel = React.useMemo(() => {
    return t("tictactoe:labelAiPlayer");
  }, [t]);

  const playerOneLable = React.useMemo(() => {
    return t("common:labelPlayerOne");
  }, [t]);

  const playerTwoLable = React.useMemo(() => {
    return t("common:labelPlayerTwo");
  }, [t]);

  const cancelLabel = React.useMemo(() => {
    return t("common:labelCancel");
  }, [t]);

  const saveLabel = React.useMemo(() => {
    return t("common:labelSave");
  }, [t]);

  const saveDisabled = React.useMemo(() => {
    if (playerMode === 0) {
      return players[0]?.name.length < 3;
    }

    return players[0]?.name.length < 3 || players[1]?.name.length < 3;
  }, [players, playerMode]);

  const handlePlayerOneChanged = React.useCallback(
    (name: string) => {
      const playerCopy = [...players];

      playerCopy[0].name = name;

      handleSettingsChanged({ players: playerCopy });
    },
    [players, handleSettingsChanged]
  );

  const handlePlayerTwoChanged = React.useCallback(
    (name: string) => {
      const playerCopy = [...players];

      playerCopy[1].name = name;

      handleSettingsChanged({ players: playerCopy });
    },
    [players, handleSettingsChanged]
  );

  const handleSaveAndClose = React.useCallback(() => {
    handleSettingsChanged({ players: players });
    handleClose();
    setLocalStorageItem(ticTacToePlayersStorageField, JSON.stringify(players));
  }, [players, handleSettingsChanged, handleClose]);

  if (!players.length) {
    return null;
  }

  return (
    <Dialog open={open} keepMounted className="tic-tac-toe-dialog">
      <DialogTitle className="tic-tac-toe-dialog-title">{title}</DialogTitle>
      <DialogContent className="tic-tac-toe-dialog-content">
        <Grid container className="tic-tac-toe-dialog-content-wrapper">
          <Grid item xs={12} className="tic-tac-toe-dialog-content-item">
            <InputTextField
              autocomplete="off"
              readonly={false}
              fullwidth={true}
              value={players[0]?.name}
              placeholder={playerOneLable}
              handleTextChanged={handlePlayerOneChanged}
            />
          </Grid>
          <Grid item xs={12} className="tic-tac-toe-dialog-content-item">
            <InputTextField
              autocomplete="off"
              readonly={playerMode === 0}
              fullwidth={true}
              value={playerMode === 0 ? aiPlayerLabel : players[1]?.name}
              placeholder={playerTwoLable}
              handleTextChanged={handlePlayerTwoChanged}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="tic-tac-toe-dialog-action">
        <InputButton
          buttonType="button"
          variant="contained"
          text={cancelLabel}
          readonly={false}
          handleClick={handleClose}
        />
        <InputButton
          buttonType="button"
          variant="contained"
          text={saveLabel}
          readonly={saveDisabled}
          handleClick={handleSaveAndClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default TicTacToePlayerConfigDialog;
