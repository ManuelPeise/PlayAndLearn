import { ITicTacToeField } from "../_interfaces/ITicTacToeField";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";

interface IBestSpot {
  row: number;
  col: number;
}
interface IMinimaxResult {
  bestScore: number;
  bestSpot?: IBestSpot;
}

export class MiniMaxAi {
  private _winOptions: number[][];

  constructor() {
    this._winOptions = this.initializeWinOptions();
  }

  public getBestAvailableSpot(
    fields: ITicTacToeField[],
    players: ITicTacToePlayer[]
  ): number {
    let board = this.initializeBoard(fields);
    const ai = players.filter((p) => p.isAiPlayer === true)[0];
    const human = players.filter((p) => p.isAiPlayer === false)[0];
    const maxPlayerValue = players.filter((p) => p.isMaxPlayer)[0].value;

    let boardCopy = board.slice();

    const result = this.miniMax(
      boardCopy,
      0,
      ai.isMaxPlayer,
      ai,
      human,
      maxPlayerValue
    );

    return boardCopy[result.bestSpot?.row ?? 0][result.bestSpot?.col ?? 0]
      .fieldId;
  }

  private miniMax(
    board: ITicTacToeField[][],
    depth: number,
    isMaxPlayer: boolean,
    aiPlayer: ITicTacToePlayer,
    humanPlayer: ITicTacToePlayer,
    maxPlayerValue: "X" | "O"
  ): IMinimaxResult {
    if (this.checkForWin(board, aiPlayer.value)) {
      return { bestScore: aiPlayer.isMaxPlayer ? 10 : -10 };
    }

    if (this.checkForWin(board, humanPlayer.value)) {
      return { bestScore: aiPlayer.isMaxPlayer ? -10 : 10 };
    }

    if (this.isTie(board)) {
      return { bestScore: 0 };
    }

    const minPlayerValue = maxPlayerValue === "X" ? "O" : "X";

    let bestSpot: IBestSpot = {} as IBestSpot;

    if (isMaxPlayer) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.isEmptyField(board[row][col])) {
            let copy = board.slice();
            copy[row][col].value = maxPlayerValue;
            let result = this.miniMax(
              copy,
              depth + 1,
              false,
              aiPlayer,
              humanPlayer,
              maxPlayerValue
            );

            if (result.bestScore > bestScore) {
              bestScore = result.bestScore;
              bestSpot = { row: row, col: col };
            }
            copy[row][col].value = "";
          }
        }
      }

      return { bestScore: bestScore, bestSpot: bestSpot };
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.isEmptyField(board[row][col])) {
            let copy = board.slice();
            copy[row][col].value = minPlayerValue;
            let result = this.miniMax(
              copy,
              depth + 1,
              true,
              aiPlayer,
              humanPlayer,
              maxPlayerValue
            );

            if (result.bestScore < bestScore) {
              bestScore = result.bestScore;
              bestSpot = { row: row, col: col };
            }

            copy[row][col].value = "";
          }
        }
      }
      return { bestScore: bestScore, bestSpot: bestSpot };
    }
  }
  // initialize the board, convert from array[] into array[][]
  private initializeBoard(fields: ITicTacToeField[]): ITicTacToeField[][] {
    const board = [
      [fields[0], fields[1], fields[2]],
      [fields[3], fields[4], fields[5]],
      [fields[6], fields[7], fields[8]],
    ];
    return board;
  }
  // initializes the winOptions field
  private initializeWinOptions() {
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
  }
  // checks the values of a row
  private allValuesOfRowEqual(
    a: string,
    b: string,
    c: string,
    exstectedValue: "X" | "O"
  ) {
    if (a !== exstectedValue) {
      return false;
    }

    return a === b && b === c;
  }
  // checks for tie result
  private isTie(board: ITicTacToeField[][]) {
    let emptyFields: ITicTacToeField[] = [];
    for (let index = 0; index < board.length; index++) {
      let row = board[index];

      row.forEach((field) => {
        if (field.value === "") {
          emptyFields.push(field);
        }
      });
    }

    return emptyFields.length === 0;
  }
  // check for winner or tie
  private checkForWin(
    board: ITicTacToeField[][],
    expectedValue: "X" | "O"
  ): boolean {
    const fields = [
      board[0][0],
      board[0][1],
      board[0][2],
      board[1][0],
      board[1][1],
      board[1][2],
      board[2][0],
      board[2][1],
      board[2][2],
    ];

    let hasWinner = false;

    for (let index = 0; index < this._winOptions.length; index++) {
      const currentFields = fields.filter((field) =>
        this._winOptions[index].includes(field.fieldId)
      );

      if (
        this.allValuesOfRowEqual(
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
  }

  private isEmptyField(field: ITicTacToeField) {
    return field.value === "";
  }
}
