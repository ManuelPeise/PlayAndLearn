import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import "../_style/ticTacToeDialog.css";
import InputButton from "src/_components/_input/InputButton";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  currentPlayerName: string;
  state: "tie" | "gameover" | "isrunning";
  handleClose: () => void;
}

const TicTacToeGameResultDialog: React.FC<IProps> = (props) => {
  const { open, currentPlayerName, state, handleClose } = props;

  const { t } = useTranslation();

  const title = React.useMemo(() => {
    return t("tictactoe:gameResultDialogTitle");
  }, [t]);

  const contentText = React.useMemo(() => {
    if (state === "gameover") {
      return t("tictactoe:labelGameOver").replace("player", currentPlayerName);
    }

    return t("tictactoe:labelTie");
  }, [t, state, currentPlayerName]);

  const buttonLabel = React.useMemo(() => {
    return t("common:labelOK");
  }, [t]);

  if (state === "isrunning") {
    return null;
  }

  return (
    <Dialog open={open} keepMounted className="tic-tac-toe-dialog">
      <DialogTitle className="tic-tac-toe-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ padding: "1.5rem" }}>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          text={buttonLabel}
          readonly={false}
          handleClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default TicTacToeGameResultDialog;
