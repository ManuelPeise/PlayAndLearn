import React from "react";
import { Dialog, DialogActions, Grid } from "@mui/material";
import { IKeyValueItem } from "../../_lib/_intefaces/IKeyValueItem";
import { IUseFileUploadResult } from "../../_hooks/useFileUpload";
import InputTextField from "src/_components/_input/InputTextField";
import { useInputButtonProps } from "src/_components/_componentHooks/useInputButtonProps";
import { useTranslation } from "react-i18next";
import InputButton from "src/_components/_input/InputButton";

interface IProps {
  open: boolean;
  title: string;
  topicItems: IKeyValueItem[];
  fileUploadHandler: IUseFileUploadResult;
  handleClose: () => void;
}

const MemoryErrorDialog: React.FC<IProps> = (props) => {
  const { open, fileUploadHandler, handleClose } = props;

  const { t } = useTranslation();

  const cancelValue = React.useMemo(() => {
    return t("common:cancel");
  }, [t]);

  const saveValue = React.useMemo(() => {
    return t("common:save");
  }, [t]);

  const cancelButtonProps = useInputButtonProps(
    "button",
    cancelValue,
    false,
    "contained",
    handleClose
  );

  const saveButtonProps = useInputButtonProps(
    "button",
    saveValue,
    fileUploadHandler.isValidConfirmText === false ||
      fileUploadHandler.uploadDisabled,
    "contained",
    handleClose
  );

  return (
    <Dialog
      maxWidth="lg"
      style={{
        minHeight: "auto",
        height: "auto",
        minWidth: "auto",
        width: "auto",
      }}
      open={open}
      keepMounted={true}
      fullWidth={true}
    >
      <DialogActions>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyItems: "center",
              margin: "1.5rem",
            }}
          >
            <InputTextField
              {...fileUploadHandler.confirmDialogTextfieldProps}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "flex" }}>
            <InputButton {...cancelButtonProps} />
            <InputButton {...saveButtonProps} />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default MemoryErrorDialog;
