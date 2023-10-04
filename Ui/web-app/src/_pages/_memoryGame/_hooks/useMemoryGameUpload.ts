import React from "react";
import { UseApi } from "src/_hooks/useApi";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { IMemoryFileMapping } from "../_interfaces/IMemoryFileMapping";
import { ITopic } from "../_interfaces/ITopic";
import { TopicTypeEnum } from "src/_lib/_enums/topicTypeEnum";

const memoryController = `${process.env.REACT_APP_API_URL}Memory/`;
const fileImportController = `${process.env.REACT_APP_API_URL}FileImport/ImportFile`;

export const useMemoryGameUpload = () => {
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [topic, setTopic] = React.useState<string>("");
  const [fileMappings, setFileMappings] = React.useState<IMemoryFileMapping[]>(
    []
  );

  const files = React.useMemo(() => {
    return fileMappings;
  }, [fileMappings]);

  const handleIsLoading = React.useCallback((isLoading: boolean) => {
    setIsloading(isLoading);
  }, []);

  const { topicDataService, topicUploadDataService, fileUploadDataService } = {
    topicDataService: UseApi<IKeyValueItem[]>(
      handleIsLoading,
      `${memoryController}GetTopics`,
      "",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": `application/json`,
        },
      }
    ),
    topicUploadDataService: UseApi(handleIsLoading),
    fileUploadDataService: UseApi(handleIsLoading),
  };

  const acceptedFileFormats = React.useMemo(() => {
    return ".jpg,.png,.jpeg";
  }, []);

  const isAcceptedFile = React.useCallback((fileName: string): boolean => {
    const isAccepted =
      fileName.toLocaleLowerCase().includes(".jpg") ||
      fileName.toLocaleLowerCase().includes(".png") ||
      fileName.toLocaleLowerCase().includes(".jpeg");

    return isAccepted;
  }, []);

  const handleTopicInputChanged = React.useCallback((topic: string) => {
    setTopic(topic);
  }, []);

  const handleTopicAutocompleteChanged = React.useCallback((topic: string) => {
    setTopic(topic);
  }, []);

  const handleDeleteFile = React.useCallback(
    (mapping: IMemoryFileMapping) => {
      console.log(mapping);
      const copy = fileMappings.filter((x) => x.key !== mapping.key);

      setFileMappings(copy);
    },
    [fileMappings]
  );

  const handleFileSelection = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const mappings: IMemoryFileMapping[] = [...fileMappings];

      if (e.target.files != null) {
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files.item(i);

          if (file !== null && isAcceptedFile(file.name)) {
            mappings.push({
              key: i,
              file: file,
              fileName: file.name,
              topic: topic,
              color: "blue",
              buffer: "",
            });
          }
        }
      }

      setFileMappings(mappings);

      setIsloading(false);
    },
    [topic, fileMappings, isAcceptedFile]
  );

  const handleReset = React.useCallback(() => {
    setTopic("");
    setFileMappings([]);
  }, []);

  const handleSave = React.useCallback(async () => {
    const topicModel: ITopic = {
      topicName: topic,
      topicType: TopicTypeEnum.Memory,
    };

    await topicUploadDataService
      .fetchData(`${memoryController}ImportTopic`, "", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": `application/json`,
        },
        body: JSON.stringify(topicModel),
      })
      .then(async () => {
        fileMappings.forEach(async (mapping) => {
          const form = new FormData();
          form.append("topic", topic);
          form.append("module", "Memory");
          form.append("fileName", mapping.fileName);
          form.append("file", mapping.file, mapping.fileName);

          await fileUploadDataService.fetchData(fileImportController, "", {
            method: "POST",
            mode: "cors",
            body: form,
          });
        });
      });
  }, [fileMappings, topic, topicUploadDataService, fileUploadDataService]);

  return {
    isLoading,
    topic,
    topics: topicDataService.response,
    fileMappings: files,
    acceptedFileFormats,
    handleIsLoading,
    handleTopicInputChanged,
    handleTopicAutocompleteChanged,
    handleDeleteFile,
    handleFileSelection,
    handleReset,
    handleSave,
  };
};
