import { IGameResult } from "../_interfaces/IGameResult";
import { ITicTacToeField } from "../_interfaces/ITicTacToeField";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import { ITicTacToeSettings } from "../_interfaces/ITicTacToeSettings";
import { getNextPlayer } from "./playerUtils";

export const getWinOptions = () => {
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
};

export const isGameOver = (
  fields: ITicTacToeField[],
  currentPlayer: ITicTacToePlayer
): IGameResult => {
  let result: IGameResult | null = null;

  const winningOptions = getWinOptions();

  for (let i = 0; i < winningOptions.length; i++) {
    const values = fields
      .filter(
        (field) =>
          winningOptions[i].includes(field.fieldId) &&
          field.value === currentPlayer.value
      )
      .map((field) => {
        return field.value;
      });

    if (
      values?.length > 0 &&
      values?.length === 3 &&
      values[0] === values[1] &&
      values[0] === values[2]
    ) {
      result = {
        resultDialogOpen: true,
        result: {
          state: "gameover",
          winner: currentPlayer.name,
        },
      };
      break;
    }
  }

  if (result != null) {
    return result;
  }

  const emptyFields = fields.filter((field) => field.value === "");

  if (!emptyFields.length) {
    return {
      resultDialogOpen: true,
      result: {
        state: "tie",
      },
    };
  }

  return {
    resultDialogOpen: false,
    result: {
      state: "isrunning",
    },
  };
};

const handleFieldClick = (
  fieldId: number,
  fields: ITicTacToeField[],
  playedFields: number[],
  currentPlayer: ITicTacToePlayer,
  players: ITicTacToePlayer[],
  handleSettingsChanged: (partialSettings: Partial<ITicTacToeSettings>) => void,
  handleResultCallback: (result: IGameResult) => void
): void => {
  const currentFields = [...fields];

  currentFields[fieldId].value = currentPlayer.value;
  currentFields[fieldId].readonly = true;

  const result = isGameOver(currentFields, currentPlayer);

  switch (result.result.state) {
    case "isrunning":
      const nextPlayer = getNextPlayer(currentPlayer.id, players);
      handleSettingsChanged({
        currentPlayer: nextPlayer,
        playedFieldIds: [...playedFields, fieldId],
        fields: currentFields,
      });
      handleResultCallback(result);
      break;
    case "gameover":
      handleSettingsChanged({ playedFieldIds: [], fields: currentFields });
      handleResultCallback(result);
      break;
    case "tie": {
      handleSettingsChanged({ playedFieldIds: [], fields: currentFields });
      handleResultCallback(result);
      break;
    }
  }
};

export const generateFields = (readonly: boolean): ITicTacToeField[] => {
  const fields: ITicTacToeField[] = [];

  for (let i = 0; i < 9; i++) {
    fields.push({
      fieldId: i,
      value: "",
      readonly: readonly,
      handleClick: handleFieldClick,
    });
  }

  return fields;
};

export const enableFields = (
  fields: ITicTacToeField[],
  selectedFieldIds: number[],
  callback: (fields: ITicTacToeField[]) => void
) => {
  const currentFields: ITicTacToeField[] = [...fields];

  currentFields.forEach((field) => {
    if (selectedFieldIds.includes(field.fieldId) === false) {
      field.readonly = false;
    }
  });

  callback(currentFields);
};

export const disableFieldsFields = (
  fields: ITicTacToeField[],
  callback: (fields: ITicTacToeField[]) => void
) => {
  const currentFields: ITicTacToeField[] = [...fields];

  currentFields.forEach((field) => {
    field.readonly = false;
  });

  callback(currentFields);
};
