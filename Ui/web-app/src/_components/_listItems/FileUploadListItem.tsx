import { Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { AttachFileRounded } from "@mui/icons-material";
import SwitchListItem from "./SwitchListItem";
import InputIconButton from "../_input/InputIconButton";
import { IMemoryFileMapping } from "src/_pages/_memory/_intefaces/IMemoryFileMapping";
import MemoryFileChipContainer from "src/_pages/_memory/_components/MemoryFileChipContainer";

interface IProps {
  hasSwitch?: boolean;
  readonly: boolean;
  multiple?: boolean;
  hasDivider?: boolean;
  acceptedFormat?: string;
  fileUploadLabel: string;
  switchLabel?: string;
  checked?: boolean;
  files: IMemoryFileMapping[];
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIsLoading: (isLoading: boolean) => void;
  handleDeleteFile: (mapping: IMemoryFileMapping) => void;
  handleHasFiles?: (checked: boolean) => void;
}

const FileUploadListItem: React.FC<IProps> = (props) => {
  const {
    hasSwitch,
    readonly,
    multiple,
    hasDivider,
    acceptedFormat,
    fileUploadLabel,
    switchLabel,
    checked,
    files,
    handleFileSelection,
    handleIsLoading,
    handleDeleteFile,
    handleHasFiles,
  } = props;

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleSelectFile = React.useCallback(() => {
    handleIsLoading(true);
    fileInputRef.current?.click();
  }, [fileInputRef, handleIsLoading]);

  return (
    <ListItem divider={hasDivider} sx={{ padding: "0px" }}>
      <Grid container>
        <List sx={{ width: "100%" }}>
          {hasSwitch && (
            <SwitchListItem
              readonly={readonly}
              hasDivider={false}
              listItemText={switchLabel ?? ""}
              paddingLeft={0.5}
              checked={checked ?? false}
              onChanged={
                handleHasFiles !== undefined ? handleHasFiles : () => {}
              }
            />
          )}
          <ListItem>
            <ListItemText sx={{ paddingLeft: "0.5rem" }}>
              {fileUploadLabel}
            </ListItemText>
            <input
              type="file"
              ref={fileInputRef}
              accept={acceptedFormat}
              hidden
              multiple={multiple}
              onChange={handleFileSelection}
            />
            <InputIconButton
              marginRight={0.5}
              readonly={readonly}
              icon={
                <AttachFileRounded
                  sx={{
                    width: "1.2rem",
                    height: "1.2rem",
                  }}
                />
              }
              handleClick={handleSelectFile}
            />
          </ListItem>
        </List>
        <MemoryFileChipContainer
          fileMappings={files}
          handleDeleteFile={handleDeleteFile}
        />
      </Grid>
    </ListItem>
  );
};

export default FileUploadListItem;
