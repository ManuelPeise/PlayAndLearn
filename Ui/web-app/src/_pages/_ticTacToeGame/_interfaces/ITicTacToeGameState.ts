import { ITicTacToePlayer } from "./ITicTacToePlayer";
import { ITicTacToeSettings } from "./ITicTacToeSettings";

export interface ITicTacToeGameState {
  selectedFields: number[];
  settings: ITicTacToeSettings;
  currentPlayer: ITicTacToePlayer;
  isAiTurn: boolean;
  gameIsRunning: boolean;
}
