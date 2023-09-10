import React from "react";
import { IFileMapping } from "../_lib/_intefaces/IFileMapping";
import { FileTypeEnum } from "../_lib/_enums/FileTypeEnum";
import { UseApi } from "./useApi";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { GameTypeEnum } from "src/_lib/_enums/GameTypeEnum";
import {
  IUseInputTextfieldProps,
  useInputTextFieldProps,
} from "src/_components/_componentHooks/useInputTextFieldProps";

export interface IUseFileUploadResult {
  isLoading: boolean;
  fileMappings: IFileMapping[];
  uploadDisabled: boolean;
  topic: string;
  confirmUploadText: string;
  isValidConfirmText: boolean;
  dialogOpen: boolean;
  topics: string[];
  autocompleteProps: IUseInputTextfieldProps;
  confirmDialogTextfieldProps: IUseInputTextfieldProps;
  downloadFile: () => Promise<void>;
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  handleFileMappingChanged: (mapping: IFileMapping) => void;
  handleSelectedTopicChanged: (topic: string) => void;
  handleSelectedFilesChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedFileChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIsLoading: (isLoading: boolean) => void;
  handleConfirmUploadValueChanged: (value: string) => void;
}

const topicDataEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetTopics`;
const fileEndpoint = `${process.env.REACT_APP_GAME_MEMORY_CONTROLLER}GetFile`;

export const UseFileUpload = (): IUseFileUploadResult => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileMappings, setFileMappings] = React.useState<IFileMapping[]>([]);
  // const [confirmUploadText, setConfirmUploadText] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const { autocompleteProps, confirmDialogTextfieldProps } = {
    autocompleteProps: useInputTextFieldProps(false, true, "", false, "Topic"),
    confirmDialogTextfieldProps: useInputTextFieldProps(
      false,
      true,
      "",
      false,
      "Type CONFIRM UPLOAD"
    ),
  };

  const handleIsLoading = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const { topicDataService } = {
    topicDataService: UseApi<IKeyValueItem[]>(
      handleIsLoading,
      topicDataEndpoint,
      `?gameType=${GameTypeEnum.Memory}`,
      { method: "GET", mode: "cors" }
    ),
  };

  const fileDataService = UseApi(handleIsLoading);

  const downloadFile = React.useCallback(async () => {
    await fileDataService.fetchData(fileEndpoint, undefined, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition":
          "attachment; filename=Ttestfile.csv; filename*=UTF-8''Ttestfile.csv",
      },
    });
  }, [fileDataService]);
  const handleDialogOpen = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleDialogClose = React.useCallback(() => {
    setDialogOpen(false);
  }, []);

  const executeFileMapping = React.useCallback(
    (files: File[]) => {
      const existingMappings = fileMappings;

      files.forEach((file, index) => {
        existingMappings.push({
          key: index,
          file: file,
          fileType: FileTypeEnum.Unknown,
          source: file.name,
          target: "",
          isValidMapping: false,
          isActive: false,
        });
      });

      setFileMappings(existingMappings);
    },
    [fileMappings]
  );

  const validateMapping = React.useCallback((mapping: IFileMapping) => {
    return (
      mapping.source !== "" &&
      mapping.target.length > 0 &&
      mapping.fileType !== FileTypeEnum.Unknown
    );
  }, []);

  const handleFileMappingChanged = React.useCallback(
    (mapping: IFileMapping) => {
      const copy = [...fileMappings];
      const index = copy.findIndex((x) => x.key === mapping.key);

      if (index !== -1) {
        copy[index] = mapping;

        copy[index].isValidMapping = validateMapping(mapping);
        setFileMappings(copy);
      }
    },
    [fileMappings, validateMapping]
  );

  const handleSelectedFilesChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files: File[] = [];

      if (e.target.files != null) {
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files.item(i);

          if (file !== null) {
            files.push(file);
          }
        }
      }

      executeFileMapping(files);

      setIsLoading(false);
    },
    [executeFileMapping]
  );

  const handleSelectedTopicChanged = React.useCallback(
    (topic: string) => {
      autocompleteProps.handleTextExternalChanged(topic);
    },
    [autocompleteProps]
  );

  const handleSelectedFileChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files: File[] = [];

      if (e.target.files != null) {
        files.push(e.target.files[0]);
      }

      executeFileMapping(files);

      setIsLoading(false);
    },
    [executeFileMapping]
  );

  // TODO handle upload

  const isValidConfirmText = React.useMemo(() => {
    return confirmDialogTextfieldProps.value === "CONFIRM";
  }, [confirmDialogTextfieldProps]);

  const uploadDisabled = React.useMemo(() => {
    if (fileMappings.length === 0) {
      return true;
    }

    const invalidMappings = fileMappings.filter(
      (x) => x.isActive && !x.isValidMapping
    );

    return invalidMappings?.length > 0;
  }, [fileMappings]);

  return {
    autocompleteProps,
    confirmDialogTextfieldProps,
    isLoading,
    fileMappings,
    uploadDisabled,
    topic: autocompleteProps.value,
    confirmUploadText: confirmDialogTextfieldProps.value,
    isValidConfirmText,
    dialogOpen,
    topics: topicDataService.response?.map((t) => t.value) ?? [],
    handleConfirmUploadValueChanged:
      confirmDialogTextfieldProps.handleTextExternalChanged,
    handleDialogClose,
    handleDialogOpen,
    handleIsLoading,
    handleSelectedTopicChanged,
    handleFileMappingChanged,
    handleSelectedFileChanged,
    handleSelectedFilesChanged,
    downloadFile,
  };
};
