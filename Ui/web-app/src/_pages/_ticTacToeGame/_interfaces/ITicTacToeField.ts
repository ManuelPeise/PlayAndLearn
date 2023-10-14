import { IGameResult } from "./IGameResult";
import { ITicTacToePlayer } from "./ITicTacToePlayer";
import { ITicTacToeSettings } from "./ITicTacToeSettings";

export interface ITicTacToeField {
  fieldId: number;
  value: "" | "X" | "O";
  readonly: boolean;
  handleClick: (
    fieldId: number,
    fields: ITicTacToeField[],
    playedFields: number[],
    currentPlayer: ITicTacToePlayer,
    players: ITicTacToePlayer[],
    handleSettingsChanged: (
      partialSettings: Partial<ITicTacToeSettings>
    ) => void,
    handleResultCallback: (result: IGameResult) => void
  ) => void;
}
