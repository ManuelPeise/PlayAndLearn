import { Paper } from "@mui/material";
import React from "react";
import { ITicTacToeField } from "../_interfaces/ITicTacToeField";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import { IGameResult } from "../_interfaces/IGameResult";
import { ITicTacToeSettings } from "../_interfaces/ITicTacToeSettings";

interface IProps {
  fields: ITicTacToeField[];
  field: ITicTacToeField;
  playedFields: number[];
  players: ITicTacToePlayer[];
  currentPlayer: ITicTacToePlayer;
  handleSettingsChanged: (partialSettings: Partial<ITicTacToeSettings>) => void;
  handleResultCallback: (result: IGameResult) => void;
}

const TicTacToeField: React.FC<IProps> = (props) => {
  const {
    fields,
    field,
    playedFields,
    currentPlayer,
    players,
    handleSettingsChanged,
    handleResultCallback,
  } = props;

  const handleFieldClick = React.useCallback(() => {
    if (field.readonly === true) {
      return;
    }

    field.handleClick(
      field.fieldId,
      fields,
      playedFields,
      currentPlayer,
      players,
      handleSettingsChanged,
      handleResultCallback
    );
  }, [
    field,
    fields,
    playedFields,
    currentPlayer,
    players,
    handleSettingsChanged,
    handleResultCallback,
  ]);

  return (
    <Paper
      className={
        field.readonly ? "tictactoe-field-disabled" : "tictactoe-field"
      }
      variant="outlined"
      onClick={handleFieldClick}
    >
      {field.value}
    </Paper>
  );
};

export default TicTacToeField;
