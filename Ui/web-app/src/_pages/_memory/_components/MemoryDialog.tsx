import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import InputButton from "src/_components/_input/InputButton";
import { DialogTransitionUp } from "src/_components/_listItems/DialogTranstion";

interface IProps {
  open: boolean;
  title: string;
  context: ReactNode;
  closeButtonValue: string;
  handleClose: () => void;
}

const MemoryDialog: React.FC<IProps> = (props) => {
  const { open, title, context, handleClose } = props;

  return (
    <Dialog
      open={open}
      keepMounted={true}
      TransitionComponent={DialogTransitionUp}
    >
      <DialogTitle>{title}</DialogTitle>
      {context}
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          text={title}
          handleClick={handleClose}
          readonly={false}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemoryDialog;
