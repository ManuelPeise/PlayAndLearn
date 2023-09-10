import { Button, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import InputAutocompleteForm from "src/_components/_input/InputAutocompleteForm";
import InputFileSelectForm from "src/_components/_input/InputFileSelectForm";
import { UseFileUpload } from "src/_hooks/useFileUpload";
import PageLayout from "../PageLayout";
import ConfirmDialog from "src/_components/_dialogs/ConfirmDialog";

interface IProps {}

const MemorySettingsPage: React.FC<IProps> = (props) => {
  const handler = UseFileUpload();
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = React.useState<string>("");

  const handleTextChanged = React.useCallback((value: string) => {
    setConfirmText(value);
  }, []);

  const saveDisabled = confirmText !== "Hallo";

  const labels = React.useMemo(() => {
    return {
      pageTitle: `${t("memory:memoryGameUploadPageTitle")}`,
      dropdownLabel: `${t("common:lang")}`,
      topicLabel: `${t("memory:topic")}`,
      selectFilesLable: `${t("common:selectFiles")}`,
      selectedFilesLable: `${t("common:selectedFiles")
        .replace(
          "{0}",
          handler.fileMappings.filter((x) => x.isActive).length.toString()
        )
        .replace("{1}", handler.fileMappings.length.toString())}`,
    };
  }, [handler.fileMappings, t]);

  return (
    <PageLayout
      pageTitle={labels.pageTitle}
      pageBody={
        <Container
          fixed
          style={{
            marginTop: "16px",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <InputAutocompleteForm
            {...handler.autocompleteProps}
            items={handler.topics}
            handleTextExternalChanged={handler.handleSelectedTopicChanged}
          />
          {/* WordListFile */}
          <InputFileSelectForm
            lable={labels.selectedFilesLable}
            isSingleFileUpload={true}
            selectButtonText={labels.selectFilesLable}
            acceptedFormat="wordlist_*_*.csv"
            fileUploadHandler={handler}
            marginTop={10}
            selectDisabled={handler.topic.length < 5}
          />
          {/* Cards */}
          <InputFileSelectForm
            lable={labels.selectedFilesLable}
            isSingleFileUpload={false}
            selectButtonText={labels.selectFilesLable}
            acceptedFormat=".csv,.txt,.jpg"
            fileUploadHandler={handler}
            marginTop={50}
            selectDisabled={handler.topic.length < 5}
          />
          <Button onClick={handler.handleDialogOpen}>Save</Button>
          <Button onClick={handler.downloadFile}>Download</Button>
          <ConfirmDialog
            open={handler.dialogOpen}
            keepMounted={true}
            title="Test Dialog"
            contentText="Das ist ein wunderschöner Dialog! Hoffentlich wird morgen schönes Wetter!"
            actionLabel="Save"
            cancelLabel="Cancel"
            saveDisabled={saveDisabled}
            confirmText={confirmText}
            onCancel={handler.handleDialogClose}
            onAction={handler.handleDialogClose}
            onConfirmTextChanged={handleTextChanged}
          />
        </Container>
      }
    />
  );
};

export default MemorySettingsPage;
