import { ITicTacToeField } from "./ITicTacToeField";
import { ITicTacToePlayer } from "./ITicTacToePlayer";

export interface ITicTacToeSettings {
  fields: ITicTacToeField[];
  playedFieldIds: number[];
  players: ITicTacToePlayer[];
  currentPlayer: ITicTacToePlayer;
  gameMode: number;
  level: number;
  gameIsRunning: boolean;
}
