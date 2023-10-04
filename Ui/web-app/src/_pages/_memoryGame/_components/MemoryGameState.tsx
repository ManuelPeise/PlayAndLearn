import { Grid } from "@mui/material";
import React from "react";
import "../_style/gameState.css";
import { IMemoryPlayer } from "../_interfaces/IMemoryPlayer";

interface IProps {
  players: IMemoryPlayer[];
}

const MemoryGameState: React.FC<IProps> = (props) => {
  const { players } = props;

  const { playerOneState, playerTwoState } = {
    playerOneState: `${players[0]?.cards.length ?? 0} / 8`,
    playerTwoState: `${players[1]?.cards.length ?? 0} / 8`,
  };

  return (
    <Grid className="memory-game-state-container">
      <Grid className="game-state-item">
        <label className="game-state-label">{playerOneState}</label>
      </Grid>
      <Grid className="game-state-item">
        <label className="game-state-label">{players[0].name}</label>
      </Grid>
      <Grid className="game-state-item">
        {players[1] !== undefined && (
          <label className="game-state-label">{players[1].name}</label>
        )}
      </Grid>
      <Grid className="game-state-item">
        {players[1] !== undefined && (
          <label className="game-state-label">{playerTwoState}</label>
        )}
      </Grid>
    </Grid>
  );
};

export default MemoryGameState;
