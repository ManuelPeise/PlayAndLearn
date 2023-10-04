import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import InputButton from "src/_components/_input/InputButton";
import { DialogTransitionUp } from "src/_components/_dialogs/DialogTranstion";

interface IProps {
  open: boolean;
  nextPlayerName: string;
  handleClose: () => void;
}

const MemorySwitchPlayerDialog: React.FC<IProps> = (props) => {
  const { open, nextPlayerName, handleClose } = props;
  const { t } = useTranslation();

  const title = React.useMemo(() => {
    return t("memory:labelSwitchPlayer");
  }, [t]);

  const text = React.useMemo(() => {
    const label = t("memory:labelNextPlayer").replace("name", nextPlayerName);

    return label;
  }, [t, nextPlayerName]);

  const buttonLabel = React.useMemo(() => {
    return t("memory:labelOK");
  }, [t]);

  const onClose = React.useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          text={buttonLabel}
          readonly={false}
          handleClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemorySwitchPlayerDialog;
