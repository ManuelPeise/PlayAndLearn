export interface ITicTacToePlayer {
  id: number;
  isMaxPlayer: boolean;
  name: string;
  value: "X" | "O";
  isAiPlayer: boolean;
}
