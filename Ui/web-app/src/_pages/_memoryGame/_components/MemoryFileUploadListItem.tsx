import { AttachFileOutlined } from "@mui/icons-material";
import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import InputIconButton from "src/_components/_input/InputIconButton";

interface IProps {
  label: string;
  acceptedFormats: string;
  allowMultiple: boolean;
  readonly: boolean;
  handleIsLoading: (isLoading: boolean) => void;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemoryFileUpLoadListItem: React.FC<IProps> = (props) => {
  const {
    label,
    acceptedFormats,
    allowMultiple,
    readonly,
    handleIsLoading,
    handleFileSelection,
  } = props;

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleSelectFile = React.useCallback(() => {
    handleIsLoading(true);
    fileInputRef.current?.click();
  }, [fileInputRef, handleIsLoading]);

  return (
    <ListItem>
      <ListItemText>{label}</ListItemText>
      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFormats}
        hidden
        multiple={allowMultiple}
        onChange={handleFileSelection}
      />
      <InputIconButton
        marginRight={0.5}
        readonly={readonly}
        icon={
          <AttachFileOutlined
            sx={{
              width: "1.2rem",
              height: "1.2rem",
            }}
          />
        }
        handleClick={handleSelectFile}
      />
    </ListItem>
  );
};

export default MemoryFileUpLoadListItem;
