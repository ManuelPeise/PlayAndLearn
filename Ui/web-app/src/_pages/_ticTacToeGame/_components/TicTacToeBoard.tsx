import { Grid } from "@mui/material";
import React from "react";
import { ITicTacToeField } from "../_interfaces/ITicTacToeField";
import TicTacToeField from "./TicTacToeField";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import TicTacToeGameResultDialog from "./TicTacToeGameResultDialog";
import { IGameResult } from "../_interfaces/IGameResult";
import { MiniMaxAi } from "../_utils/minimaxAi";
import { getFieldIndexFromStupidAi } from "../_utils/stupidAi";
import { getBestSpotFromMediumAI } from "../_utils/mediumAi";
import { ITicTacToeSettings } from "../_interfaces/ITicTacToeSettings";

interface IProps {
  currentPlayer: ITicTacToePlayer;
  selectedFields: number[];
  isRunning: boolean;
  players: ITicTacToePlayer[];
  level: number;
  fields: ITicTacToeField[];
  handleSettingsChanged: (partialSettings: Partial<ITicTacToeSettings>) => void;
  handleResetGameState: () => void;
  handleGameOver: () => void;
}

const TicTacToeBoard: React.FC<IProps> = (props) => {
  const {
    currentPlayer,
    selectedFields,
    isRunning,
    players,
    level,
    fields,
    handleSettingsChanged,
    handleGameOver,
  } = props;

  const [gameResult, setGameResult] = React.useState<IGameResult>(
    {} as IGameResult
  );

  const [resultOpen, setResultOpen] = React.useState<boolean>(false);

  const handleShowResult = React.useCallback((show: boolean) => {
    setResultOpen(show);
  }, []);

  const handleHideResult = React.useCallback(() => {
    setResultOpen(false);
    handleGameOver();
  }, [handleGameOver]);

  const handleGameResultCallBack = React.useCallback(
    (result: IGameResult) => {
      setGameResult(result);
      handleShowResult(result.resultDialogOpen);
    },
    [handleShowResult]
  );

  const allValuesOfRowEqual = React.useCallback(
    (a: string, b: string, c: string, exstectedValue: "X" | "O") => {
      if (a !== exstectedValue) {
        return false;
      }

      return a === b && b === c;
    },
    []
  );

  const winOptions = React.useMemo(() => {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }, []);

  const checkForWin = React.useCallback(
    (fields: ITicTacToeField[], expectedValue: "X" | "O"): boolean => {
      let hasWinner = false;

      for (let index = 0; index < winOptions.length; index++) {
        const currentFields = fields.filter((field) =>
          winOptions[index].includes(field.fieldId)
        );

        if (
          allValuesOfRowEqual(
            currentFields[0].value,
            currentFields[1].value,
            currentFields[2].value,
            expectedValue
          )
        ) {
          hasWinner = true;
          break;
        }
      }

      return hasWinner;
    },
    [allValuesOfRowEqual, winOptions]
  );

  const moveAi = React.useCallback(() => {
    const availableFields = fields.filter(
      (field) => selectedFields.includes(field.fieldId) === false
    );
    if (availableFields.length > 0) {
      let index = -1;
      switch (level) {
        case 0:
          index = getFieldIndexFromStupidAi(fields);
          break;
        case 1:
          index = getBestSpotFromMediumAI(fields, currentPlayer.value);
          break;
        case 2:
          const miniMaxAi = new MiniMaxAi();
          const field = miniMaxAi.getBestAvailableSpot(fields, players);
          index = field;
          break;
      }

      const copy = fields.slice();
      copy[index].value = currentPlayer.value;

      if (index !== undefined) {
        fields[index].handleClick(
          fields[index].fieldId,
          fields,
          selectedFields,
          currentPlayer,
          players,
          handleSettingsChanged,
          handleGameResultCallBack
        );
      }

      if (checkForWin(copy, currentPlayer.value)) {
        handleGameOver();
      }
    }
  }, [
    fields,
    selectedFields,
    currentPlayer,
    players,
    level,
    checkForWin,
    handleGameOver,
    handleSettingsChanged,
    handleGameResultCallBack,
  ]);

  React.useEffect(() => {
    if (currentPlayer.isAiPlayer === true && isRunning === true) {
      moveAi();
    }
  }, [moveAi, currentPlayer, isRunning]);

  return (
    <Grid className="tic-tac-toe-board-container">
      <Grid className="tic-tac-toe-board">
        {fields.map((field, index) => (
          <TicTacToeField
            key={index}
            fields={fields}
            field={field}
            playedFields={selectedFields}
            currentPlayer={currentPlayer}
            players={players}
            handleSettingsChanged={handleSettingsChanged}
            handleResultCallback={handleGameResultCallBack}
          />
        ))}
      </Grid>
      {resultOpen && (
        <TicTacToeGameResultDialog
          open={resultOpen}
          currentPlayerName={currentPlayer.name}
          handleClose={handleHideResult}
          state={gameResult.result.state}
        />
      )}
    </Grid>
  );
};

export default TicTacToeBoard;
