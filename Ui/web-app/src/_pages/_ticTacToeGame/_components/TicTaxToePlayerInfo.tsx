import { FormLabel, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  currentPlayer: string | null;
  isRunning: boolean;
}

const TicTacToePlayerInfo: React.FC<IProps> = (props) => {
  const { currentPlayer, isRunning } = props;

  const { t } = useTranslation();

  const currentPlayersTurnLabel = React.useMemo(() => {
    if (currentPlayer != null) {
      return t("tictactoe:labelCurrentPlayersTurn").replace(
        "currentPlayer",
        currentPlayer
      );
    }

    return null;
  }, [t, currentPlayer]);

  if (!isRunning) {
    return null;
  }

  return (
    <Grid sx={{ marginTop: "1rem" }} container justifyContent="center">
      <FormLabel sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {currentPlayersTurnLabel}
      </FormLabel>
    </Grid>
  );
};

export default TicTacToePlayerInfo;
