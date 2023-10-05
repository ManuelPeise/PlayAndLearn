import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { IDialogProps } from "src/_lib/_intefaces/_IDialogProps";

interface IProps extends IDialogProps {
  open: boolean;
  confirmText: string;
  onConfirmTextChanged: (value: string) => void;
}

const ConfirmDialog: React.FC<IProps> = (props) => {
  const {
    open,
    keepMounted,
    title,
    contentText,
    cancelLabel,
    actionLabel,
    confirmText,
    saveDisabled,
    onConfirmTextChanged,
    onAction,
    onCancel,
  } = props;

  const onTextChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onConfirmTextChanged(e.currentTarget.value as string);
    },
    [onConfirmTextChanged]
  );

  return (
    <Dialog keepMounted={keepMounted} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          autoFocus
          label="test"
          autoComplete="off"
          type="text"
          margin="dense"
          fullWidth={true}
          variant="standard"
          value={confirmText}
          onChange={onTextChanged}
        />
      </DialogContent>
      <DialogActions sx={{ margin: "1rem" }}>
        {cancelLabel && <Button onClick={onCancel}>{cancelLabel}</Button>}
        <Button disabled={saveDisabled} onClick={onAction}>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
