export interface IGameResult {
  resultDialogOpen: boolean;
  result: {
    state: "gameover" | "tie" | "isrunning";
    winner?: string;
  };
}
