import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";
import { ITicTacToeField } from "../_interfaces/ITicTacToeField";

export class TicTacToeGameStateHandler {
  private _currentPlayer: ITicTacToePlayer | null;
  private _gameIsRunning: boolean;
  private _fields: ITicTacToeField[];

  constructor() {
    this._currentPlayer = null;
    this._gameIsRunning = false;
    this._fields = [];
  }

  public get gameIsRunning(): boolean {
    return this._gameIsRunning;
  }

  public set setGameIsRunning(isRunning: boolean) {
    this._gameIsRunning = isRunning;
  }

  public get currentPlayer(): ITicTacToePlayer | undefined {
    if (this._currentPlayer != null) return this._currentPlayer;
  }

  public setCurrentPlayer(player: ITicTacToePlayer) {
    this._currentPlayer = player;
  }

  // gets a random player on start of game
  public getRandonPlayer = (players: ITicTacToePlayer[]) => {
    const index = getRandomIndex(100);

    if (index % 2 === 0) {
      return players[0];
    }

    return players[1];
  };

  // gets the next player
  public getNextPlayer = (currentId: number, players: ITicTacToePlayer[]) => {
    if (currentId === 0) {
      return players[1];
    }

    return players[0];
  };
}
