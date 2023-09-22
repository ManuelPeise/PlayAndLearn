import { Box, List } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SwitchListItem from "src/_components/_listItems/SwitchListItem";
import FileUploadListItem from "src/_components/_listItems/FileUploadListItem";
import AutoCompleteListItem from "src/_components/_listItems/AutoCompleteListItem";
import { useMemoryUpload } from "../_hooks/useMemoryUpload";
import { MemoryUploadContext } from "../MemoryUploadContext";
import MemoryFileUploadDialog from "./MemoryFileUploadDialog";
import SaveCancelListItem from "src/_components/_listItems/SaveCancelListItem";
import TitleListItem from "src/_components/_listItems/TitleListItem";
import { DownloadRounded } from "@mui/icons-material";

const MemorySettingsContainer: React.FC = () => {
  const { settings, isLoading, onSettingsChanged, onHandleIsLoading } =
    React.useContext(MemoryUploadContext);

  const uploadService = useMemoryUpload(
    settings,
    isLoading,
    onSettingsChanged,
    onHandleIsLoading
  );

  const { t } = useTranslation();

  const labels = React.useMemo(() => {
    return {
      labelTopic: t("memory:labelTopic"),
      descriptionLevelSelection: t("memory:labelLevelselection"),
      descriptionPlayerSelection: t(`memory:labelPlayerselection`),
      descriptionImportFiles: t(`memory:labelImportFiles`),
      labelImportMemoryFiles: t(`memory:labelImportMemoryFiles`),
      titleErrorDialog: t(`memory:titleFileUploadErrorDialog`),
      descriptionFileUploadErrorDialog: t(
        `memory:descriptionFileUploadErrorDialog`
      ),
      labelSave: t(`memory:labelSave`),
      labelCancel: t(`memory:labelCancel`),
      labelGeneralSettings: t(`memory:labelGeneralSettings`),
      labelFileUploadSettings: t(`memory:labelFileUploadSettings`),
      labelWordlistDownload: t(`memory:labelWordlistDownload`),
    };
  }, [t]);

  const topicLabel = React.useMemo(() => {
    return t("memory:topic");
  }, [t]);

  const handleAutocompleteTextChanged = React.useCallback(
    (value: string) => {
      if (onSettingsChanged !== undefined)
        onSettingsChanged({
          ...settings,
          topicFallbackValue: value,
          topic: value,
        });
    },
    [settings, onSettingsChanged]
  );

  const handleHasLevelSelectionChanged = React.useCallback(
    (checked: boolean) => {
      if (onSettingsChanged !== undefined) {
        onSettingsChanged({ ...settings, hasLevelSelection: checked });
      }
    },
    [settings, onSettingsChanged]
  );

  const handleHasPlayerSelectionChanged = React.useCallback(
    (checked: boolean) => {
      if (onSettingsChanged !== undefined)
        onSettingsChanged({ hasPlayerSelection: checked });
    },
    [onSettingsChanged]
  );

  const onCancel = React.useCallback(() => {
    onSettingsChanged(uploadService.originalSettings);
  }, [uploadService, onSettingsChanged]);

  const topicItems = React.useMemo(() => {
    const topics: string[] = [];

    settings.topicItems?.forEach((topic) => {
      topics.push(topic.value);
    });

    topics.splice(0, 1);

    return topics;
  }, [settings]);

  const cancelDisabled = React.useMemo((): boolean => {
    return (
      JSON.stringify(uploadService.originalSettings) ===
      JSON.stringify(settings)
    );
  }, [settings, uploadService.originalSettings]);

  return (
    <Box sx={{ padding: "1rem" }}>
      <List>
        <TitleListItem title={labels.labelGeneralSettings} hasDivider={true} />
        <AutoCompleteListItem
          hasDivider={false}
          placeholder={topicLabel}
          readonly={false}
          items={topicItems}
          label={labels?.labelTopic ?? ""}
          fullwidth={false}
          inputValue={settings?.topicFallbackValue ?? ""}
          value={settings?.topic ?? ""}
          handleChange={uploadService.handleAutocompleteChanged}
          handleTextChanged={handleAutocompleteTextChanged}
        />
        <SwitchListItem
          readonly={settings.topic?.length < 3}
          checked={settings?.hasLevelSelection ?? false}
          hasDivider={false}
          paddingLeft={0.5}
          listItemText={labels?.descriptionLevelSelection}
          onChanged={handleHasLevelSelectionChanged}
        />
        <SwitchListItem
          readonly={settings.topic?.length < 3}
          checked={settings?.hasPlayerSelection ?? false}
          hasDivider={false}
          paddingLeft={0.5}
          listItemText={labels?.descriptionPlayerSelection ?? ""}
          onChanged={handleHasPlayerSelectionChanged}
        />
        <TitleListItem
          title={labels.labelFileUploadSettings}
          hasDivider={true}
          toolTipLabel={labels.labelWordlistDownload}
          readonly={settings.topic?.length < 3}
          icon={
            <DownloadRounded
              sx={{
                width: "1.2rem",
                height: "1.2rem",
              }}
            />
          }
          onClick={uploadService.handleDownloadWordListTemplate}
        />
        <FileUploadListItem
          readonly={settings.topic?.length < 3}
          hasDivider={false}
          multiple={true}
          switchLabel={labels.descriptionImportFiles}
          acceptedFormat=".jpg, .png,.jpeg,.txt"
          fileUploadLabel={labels.labelImportMemoryFiles}
          files={settings.files}
          handleIsLoading={uploadService.handleIsLoading}
          handleFileSelection={uploadService.handleSelectFiles}
          handleDeleteFile={uploadService.handleDeleteFile}
        />
        <SaveCancelListItem
          cancelValue={labels.labelCancel}
          cancelDisabled={cancelDisabled}
          onCancel={onCancel}
          saveValue={labels.labelSave}
          saveDisabled={cancelDisabled}
          onSave={uploadService.handleSaveSettings}
        />
      </List>
      <MemoryFileUploadDialog
        title={labels.titleErrorDialog}
        dialogText={labels.descriptionFileUploadErrorDialog}
        okBtnLabel="OK"
        open={uploadService.fileUploadDialogOpen}
        handleClose={uploadService.handleFileUploadDialogClose}
      />
    </Box>
  );
};

export default MemorySettingsContainer;
