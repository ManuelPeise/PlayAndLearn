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

export const getFieldIndexFromStupidAi = (
  fields: ITicTacToeField[]
): number => {
  let bestFieldId: number | null = null;
  const winningOptions = initializeWinOptions();

  for (let index = 0; index < winningOptions.length; index++) {
    let currentFields = fields.filter((x) =>
      winningOptions[index].includes(x.fieldId)
    );

    if (hasTwoEqualFields(currentFields)) {
      let field = currentFields.filter(
        (x) => x.value === "" && x.readonly === false
      )[0];

      bestFieldId = field !== undefined ? field.fieldId : null;

      break;
    }
  }

  if (bestFieldId !== null) {
    return bestFieldId;
  }

  const availableFields = fields.filter(
    (f) => f.value === "" && f.readonly === false
  );

  const index = getRandomIndex(availableFields.length);

  return availableFields[index].fieldId;
};
