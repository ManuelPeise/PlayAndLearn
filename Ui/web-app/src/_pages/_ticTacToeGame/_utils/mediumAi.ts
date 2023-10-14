import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { ITicTacToeField } from "../_interfaces/ITicTacToeField";

const initializeWinOptions = () => {
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

const hasTwoEqualFields = (fieldsOfRow: ITicTacToeField[]): boolean => {
  const xFields = fieldsOfRow.filter((x) => x.value === "X");
  const oFields = fieldsOfRow.filter((x) => x.value === "O");

  return xFields.length === 2 || oFields.length === 2;
};

const canWin = (fieldsOfRow: ITicTacToeField[], value: "X" | "O") => {
  const emptyFields = fieldsOfRow.filter((x) => x.value === "");

  if (emptyFields.length === 0) {
    return false;
  }

  const ownFields = fieldsOfRow.filter((x) => x.value === value);

  if (ownFields.length === 2 && emptyFields.length === 1) {
    return true;
  }

  return false;
};

export const getBestSpotFromMediumAI = (
  fields: ITicTacToeField[],
  value: "X" | "O"
) => {
  const winningOtions = initializeWinOptions();
  const humanValue = value === "X" ? "O" : "X";

  let bestField: number | null = null;

  for (let index = 0; index < winningOtions.length; index++) {
    let currentFields = fields.filter((x) =>
      winningOtions[index].includes(x.fieldId)
    );
    if (hasTwoEqualFields(currentFields)) {
      if (canWin(currentFields, value)) {
        bestField = currentFields.filter((x) => x.value === "")[0].fieldId;

        break;
      }

      if (canWin(currentFields, humanValue)) {
        bestField = currentFields.filter((x) => x.value === "")[0].fieldId;

        break;
      }
    }
  }

  if (bestField != null) {
    return bestField;
  }

  const availableFields = fields.filter(
    (f) => f.value === "" && f.readonly === false
  );

  const index = getRandomIndex(availableFields.length);

  return availableFields[index].fieldId;
};
