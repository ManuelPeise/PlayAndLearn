import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { DialogTransitionUp } from "src/_components/_dialogs/DialogTranstion";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";
import { useMemoryGameUpload } from "../_hooks/useMemoryGameUpload";
import AutoCompleteListItem from "src/_components/_listItems/AutoCompleteListItem";
import MemoryFileUpLoadListItem from "./MemoryFileUploadListItem";
import MemoryFileChipListItem from "./MemoryFileChipListItem";
import InputButton from "src/_components/_input/InputButton";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const MemoryGameUploadDialog: React.FC<IProps> = (props) => {
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const {
    isLoading,
    topic,
    topics,
    fileMappings,
    acceptedFileFormats,
    handleIsLoading,
    handleTopicInputChanged,
    handleTopicAutocompleteChanged,
    handleDeleteFile,
    handleFileSelection,
    handleReset,
    handleSave,
  } = useMemoryGameUpload();

  const dialogTitle = React.useMemo(() => {
    return t("memory:labelMemoryUploadGame");
  }, [t]);

  const dialogContentText = React.useMemo(() => {
    return t("memory:labelAddOrUpdateMemoryGame");
  }, [t]);

  const topicLabel = React.useMemo(() => {
    return t("common:labelTopic");
  }, [t]);

  const labelImportFiles = React.useMemo(() => {
    return t("common:labelImportFiles");
  }, [t]);

  const labelSave = React.useMemo(() => {
    return t("common:labelSave");
  }, [t]);

  const labelCancel = React.useMemo(() => {
    return t("common:labelCancel");
  }, [t]);

  const handleCloseDialog = React.useCallback(() => {
    handleClose();
    handleReset();
  }, [handleClose, handleReset]);

  const handleSaveGame = React.useCallback(async () => {
    await handleSave();
    handleClose();
  }, [handleClose, handleSave]);

  return (
    <Dialog
      maxWidth="md"
      open={open}
      keepMounted
      TransitionComponent={DialogTransitionUp}
    >
      <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <Loadingindicator isLoading={isLoading} width="auto" />
        <Box>
          <List>
            <ListItem>
              <DialogContentText>{dialogContentText}</DialogContentText>
            </ListItem>
            <AutoCompleteListItem
              hasDivider={false}
              placeholder={topicLabel}
              readonly={false}
              items={
                topics
                  ?.filter((x) => x.key !== 0)
                  ?.map((x) => {
                    return x.value;
                  }) ?? []
              }
              fullwidth={true}
              inputValue={topic}
              value={topic}
              noOptionLabel="-"
              handleChange={handleTopicAutocompleteChanged}
              handleTextChanged={handleTopicInputChanged}
            />
            <MemoryFileUpLoadListItem
              readonly={topic.length < 3}
              label={labelImportFiles}
              acceptedFormats={acceptedFileFormats}
              allowMultiple={true}
              handleIsLoading={handleIsLoading}
              handleFileSelection={handleFileSelection}
            />
            <MemoryFileChipListItem
              files={fileMappings}
              handleDeleteFile={handleDeleteFile}
            />
          </List>
        </Box>
      </DialogContent>
      <DialogActions style={{ paddingRight: "2rem" }}>
        <InputButton
          text={labelCancel}
          buttonType="button"
          variant="contained"
          readonly={false}
          handleClick={handleCloseDialog}
        />
        <InputButton
          text={labelSave}
          buttonType="button"
          variant="contained"
          readonly={topic.length < 3 || fileMappings.length < 8}
          handleClick={handleSaveGame}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemoryGameUploadDialog;
