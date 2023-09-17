import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  errorTextKey: string;
  handleClose: () => void;
}

const ErrorDialog: React.FC<IProps> = (props) => {
  const { open, errorTextKey, handleClose } = props;
  const { t } = useTranslation();

  const errorText = React.useMemo(() => {
    return t(`memory:${errorTextKey}`);
  }, [errorTextKey]);

  return (
    <Dialog keepMounted open={open}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{errorText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
