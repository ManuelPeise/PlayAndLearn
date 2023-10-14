import { getRandomIndex } from "src/_lib/_utils/GameConfigurationHandler";
import { ITicTacToePlayer } from "../_interfaces/ITicTacToePlayer";

export const getStartPlayer = (
  players: ITicTacToePlayer[]
): ITicTacToePlayer => {
  const value = getRandomIndex(100);
  let player: ITicTacToePlayer;

  if (value % 2 === 0) {
    player = players[0];
    player.isMaxPlayer = true;
    return player;
  }

  player = players[1];
  player.isMaxPlayer = true;

  return player;
};

export const getNextPlayer = (
  playerId: number,
  players: ITicTacToePlayer[]
): ITicTacToePlayer => {
  if (playerId === 0) {
    return players[1];
  }

  return players[0];
};
