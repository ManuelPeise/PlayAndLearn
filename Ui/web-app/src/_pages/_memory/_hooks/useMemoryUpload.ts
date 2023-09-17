import { IMemorySettings } from "../_intefaces/IMemorySettings";
import { UseApi } from "src/_hooks/useApi";
import React from "react";
import { IMemoryFileMapping } from "../_intefaces/IMemoryFileMapping";
import UseFileDownloadApi from "src/_hooks/useFileDownloadApi";

interface IUseMemorySettingsResult {
  originalSettings: IMemorySettings;
  isLoading: boolean;
  fileUploadDialogOpen: boolean;
  handleAutocompleteChanged: (value: string) => Promise<void>;
  handleIsLoading: (isLoading: boolean) => void;
  handleSelectFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: (mapping: IMemoryFileMapping) => void;
  handleFileUploadDialogClose: () => void;
  handleSaveSettings: () => Promise<void>;
  handleDownloadWordListTemplate: () => Promise<void>;
}

interface IGameSettingsRequestModel {
  topic: string;
  hasPlayerSelection: boolean;
  hasLevelSelection: boolean;
  hasTopicSelection: boolean;
}

const memoryGameUploadController = `${process.env.REACT_APP_API_URL}MemoryGameUpload/`;

export const useMemoryUpload = (
  settings: IMemorySettings,
  isLoading: boolean,
  onSettingsChanged: (settings: IMemorySettings) => void,
  handleIsLoading: (isLoading: boolean) => void
): IUseMemorySettingsResult => {
  const isAcceptedFile = React.useCallback((fileName: string): boolean => {
    return (
      fileName.toLocaleLowerCase().includes("memoryforegroundimage") ||
      fileName.toLocaleLowerCase().includes("memorybackgroundimage") ||
      fileName.toLocaleLowerCase().includes("memorywordlist")
    );
  }, []);

  const originalSettings = React.useRef<IMemorySettings>({} as IMemorySettings);

  const {
    settingsApi,
    settingsUploadApi,
    fileUploadApi,
    templateFileDownloadApi,
  } = {
    settingsApi: UseApi<IMemorySettings>(
      handleIsLoading,
      `${memoryGameUploadController}GetInitialSate`,
      "",
      {
        method: "GET",
        mode: "cors",
      }
    ),
    settingsUploadApi: UseApi<boolean>(handleIsLoading),
    fileUploadApi: UseApi<boolean>(handleIsLoading),
    templateFileDownloadApi: UseFileDownloadApi(),
  };

  const [fileUploadDialogOpen, setFileUploadDialogOpen] =
    React.useState<boolean>(false);

  const handleFileUploadDialogClose = React.useCallback(() => {
    setFileUploadDialogOpen(false);
  }, []);

  React.useEffect(() => {
    if (settingsApi.response !== undefined) {
      originalSettings.current = settingsApi.response;
      onSettingsChanged(settingsApi.response);
    }
    // eslint-disable-next-line
  }, [settingsApi.response]);

  // React.useEffect(() => {
  //   if (templateFileDownloadApi.dataIsBound) {
  //     console.log("data is bound");
  //   }
  // }, [templateFileDownloadApi.dataIsBound]);

  const getFileType = React.useCallback(
    (
      fileName: string
    ):
      | "MemoryForegroundImage"
      | "MemoryBackgroundImage"
      | "MemoryWordList"
      | "unknown" => {
      if (fileName.toLocaleLowerCase().startsWith("memoryforegroundimage")) {
        return "MemoryForegroundImage";
      }

      if (fileName.toLocaleLowerCase().startsWith("memorybackgroundimage")) {
        return "MemoryBackgroundImage";
      }

      if (fileName.toLocaleLowerCase().startsWith("memorywordlist")) {
        return "MemoryWordList";
      }

      return "unknown";
    },
    []
  );

  const getColor = React.useCallback(
    (
      filetype:
        | "MemoryForegroundImage"
        | "MemoryBackgroundImage"
        | "MemoryWordList"
        | "unknown"
    ): "blue" | "lightblue" | "green" | "pink" => {
      switch (filetype) {
        case "unknown":
          return "pink";
        case "MemoryBackgroundImage":
          return "lightblue";
        case "MemoryForegroundImage":
          return "blue";
        case "MemoryWordList":
          return "green";
      }
    },
    []
  );

  const handleAutocompleteChanged = React.useCallback(
    async (value: string) => {
      if (onSettingsChanged !== undefined) {
        onSettingsChanged({ ...settings, topic: value });
      }

      await settingsApi.fetchData(
        `${memoryGameUploadController}GetMemorySettings/${value}`,
        "",
        { method: "GET", mode: "cors" }
      );
    },
    [settingsApi, settings, onSettingsChanged]
  );

  const handleDeleteFile = React.useCallback(
    (mapping: IMemoryFileMapping) => {
      console.log("Try delete: ", mapping.key);
      const copy = settings.files.filter((x) => x.key !== mapping.key);

      onSettingsChanged({ ...settings, files: copy });
    },
    [settings, onSettingsChanged]
  );

  const handleSelectFiles = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      handleIsLoading(true);
      e.preventDefault();
      const mappings: IMemoryFileMapping[] = [...settings.files];

      if (e.target.files != null) {
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files.item(i);

          if (file !== null && isAcceptedFile(file.name)) {
            mappings.push({
              key: i,
              file: file,
              fileName: file.name,
              fileType: getFileType(file.name),
              topic: settings.topic,
              color: getColor(getFileType(file.name)),
            });
          }
        }
      }

      if (mappings.length === 0) {
        setFileUploadDialogOpen(true);
      }
      onSettingsChanged({ ...settings, files: mappings });

      console.log("Settings:", settings);
      handleIsLoading(false);
    },
    [
      settings,
      onSettingsChanged,
      getColor,
      getFileType,
      handleIsLoading,
      isAcceptedFile,
    ]
  );

  const handleDownloadWordListTemplate =
    React.useCallback(async (): Promise<void> => {
      await templateFileDownloadApi.downLoadFile(
        `${memoryGameUploadController}GetWordlistTemplate`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "content-type": `binary/octet-stream; content-disposition": inline; filename=wordlist_${settings.topic}.txt`,
          },
        },
        `MemoryWordList_${settings.topic ?? "{topic}"}.txt`
      );
    }, [templateFileDownloadApi, settings.topic]);

  const handleSaveSettings = React.useCallback(async () => {
    try {
      if (settings.topic !== undefined && settings.topic !== "") {
        const requestModel: IGameSettingsRequestModel = {
          topic: settings.topic,
          hasLevelSelection: settings.hasLevelSelection,
          hasPlayerSelection: settings.hasPlayerSelection,
          hasTopicSelection: settings.hasTopicSelection,
        };

        try {
          await settingsUploadApi
            .fetchData(
              `${memoryGameUploadController}SaveOrUpdateGameSettings`,
              "",
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "content-type": `application/json`,
                },
                body: JSON.stringify(requestModel),
              }
            )
            .then(async () => {
              settings?.files?.forEach(async (mapping) => {
                const fileName = mapping.fileName;
                const fileType = mapping.fileType;

                const form = new FormData();
                form.append("topic", settings.topic);
                form.append("fileName", fileName);
                form.append("fileType", fileType);
                form.append("file", mapping.file, mapping.fileName);

                await fileUploadApi.fetchData(
                  `${memoryGameUploadController}UploadMemoryFile`,
                  "",
                  {
                    method: "POST",
                    mode: "cors",
                    body: form,
                  }
                );
              });

              console.log("data sended");
            });
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
    } catch {
      console.log("error while uploading data!");
    } finally {
      // await settingsApi.fetchData();
    }
  }, [settingsUploadApi, fileUploadApi, settings]);

  return {
    originalSettings: originalSettings.current,
    isLoading,
    fileUploadDialogOpen,
    handleAutocompleteChanged,
    handleIsLoading,
    handleSelectFiles,
    handleDeleteFile,
    handleFileUploadDialogClose,
    handleSaveSettings,
    handleDownloadWordListTemplate,
  };
};
