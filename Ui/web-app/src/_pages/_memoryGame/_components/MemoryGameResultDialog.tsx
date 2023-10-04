import React from "react";
import { IMemoryPlayer } from "../_interfaces/IMemoryPlayer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InputButton from "src/_components/_input/InputButton";
import { DialogTransitionUp } from "src/_components/_dialogs/DialogTranstion";

interface IProps {
  open: boolean;
  players: IMemoryPlayer[];
  handleClose: () => Promise<void>;
  handleRestart: () => Promise<void>;
}

const MemoryGameResultDialog: React.FC<IProps> = (props) => {
  const { open, players, handleClose, handleRestart } = props;
  const { t } = useTranslation();

  const title = React.useMemo(() => {
    return t("memory:labelGameEnd");
  }, [t]);

  const OKlabel = React.useMemo(() => {
    return t("memory:labelOK");
  }, [t]);

  const restartGameLabel = React.useMemo(() => {
    return t("memory:labelRestartGame");
  }, [t]);

  const contentText = React.useMemo(() => {
    let txt = "";

    if (players[0] !== undefined) {
      txt = `${players[0].name} ${players[0].cards.length}`;
    }

    if (players[1] !== undefined) {
      txt += `     :     ${players[1].cards.length} ${players[1].name}`;
    }

    return txt;
  }, [players]);

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <InputButton
          text={restartGameLabel}
          buttonType="button"
          variant="contained"
          readonly={false}
          handleClick={handleRestart}
        />
        <InputButton
          text={OKlabel}
          buttonType="button"
          variant="contained"
          readonly={false}
          handleClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemoryGameResultDialog;
