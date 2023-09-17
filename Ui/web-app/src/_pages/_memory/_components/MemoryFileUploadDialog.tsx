import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import InputButton from "src/_components/_input/InputButton";
import { DialogTransitionUp } from "src/_components/_listItems/DialogTranstion";

interface IProps {
  open: boolean;
  title: string;
  dialogText: string;
  okBtnLabel: string;
  handleClose: () => void;
}

const MemoryFileUploadDialog: React.FC<IProps> = (props) => {
  const { open, title, dialogText, okBtnLabel, handleClose } = props;

  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <Dialog
      ref={ref}
      open={open}
      keepMounted
      TransitionComponent={DialogTransitionUp}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          text={okBtnLabel}
          readonly={false}
          handleClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemoryFileUploadDialog;
