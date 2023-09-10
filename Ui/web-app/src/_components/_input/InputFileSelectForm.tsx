import { Grid, Typography } from "@mui/material";
import React from "react";
import { IUseFileUploadResult } from "../../_hooks/useFileUpload";
import FileUploadList from "../_advanced/_fileUpload/FileUploadList";
import { useInputButtonProps } from "../_componentHooks/useInputButtonProps";
import InputButton from "./InputButton";

interface IProps {
  selectButtonText: string;
  acceptedFormat: string;
  isSingleFileUpload: boolean;
  fileUploadHandler: IUseFileUploadResult;
  selectDisabled: boolean;
  marginTop: number;
  lable: string;
}

const InputFileSelectForm: React.FC<IProps> = (props) => {
  const {
    selectButtonText,
    // acceptedFormat,
    isSingleFileUpload,
    fileUploadHandler,
    selectDisabled,
    marginTop,
    lable,
  } = props;

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleSelectFile = React.useCallback(() => {
    fileUploadHandler.handleIsLoading(true);
    fileInputRef.current?.click();
  }, [fileInputRef, fileUploadHandler]);

  const fileuploadButtonProps = useInputButtonProps(
    "button",
    selectButtonText,
    selectDisabled || fileUploadHandler.isLoading,
    "contained",
    handleSelectFile
  );

  return (
    <Grid
      container
      sx={{
        marginTop: `${marginTop}px`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{
          padding: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={{ marginLeft: ".5rem" }} variant="h6">
          {lable}
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          accept={".jpg"}
          hidden
          multiple
          onChange={
            isSingleFileUpload
              ? fileUploadHandler.handleSelectedFileChanged
              : fileUploadHandler.handleSelectedFilesChanged
          }
        />
        <InputButton {...fileuploadButtonProps} />

        <Grid item xs={12}>
          {fileUploadHandler.fileMappings.length > 0 && (
            <FileUploadList
              fileUploadHandler={fileUploadHandler}
              hasStickyHeader={true}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputFileSelectForm;
