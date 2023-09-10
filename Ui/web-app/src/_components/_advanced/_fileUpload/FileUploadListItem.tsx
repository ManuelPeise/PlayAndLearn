import React from "react";
import { IFileMapping } from "../../../_lib/_intefaces/IFileMapping";
import { Grid } from "@mui/material";
import { IFileUploadTableColumn } from "./FileUploadList";
import { IUseFileUploadResult } from "../../../_hooks/useFileUpload";
import { useInputTextFieldProps } from "src/_components/_componentHooks/useInputTextFieldProps";
import InputTextField from "src/_components/_input/InputTextField";
import { useInputCheckboxProps } from "src/_components/_componentHooks/useInputCheckboxProps";
import InputCheckbox from "src/_components/_input/InputCheckbox";
import { useTranslation } from "react-i18next";

interface IProps {
  mapping: IFileMapping;
  columnDefinitions: IFileUploadTableColumn[];
  fileUploadHandler: IUseFileUploadResult;
}

const FileUploadListItem: React.FC<IProps> = (props) => {
  const { mapping, columnDefinitions, fileUploadHandler } = props;

  const { t } = useTranslation();

  const handleCheckedChanged = React.useCallback(
    (value: boolean) => {
      fileUploadHandler.handleFileMappingChanged({
        ...mapping,
        isActive: value,
      });
    },
    [mapping, fileUploadHandler]
  );

  const checkboxToolTip = React.useMemo(() => {
    return t("memory:select");
  }, [t]);

  const checkboxProps = useInputCheckboxProps(
    mapping.isActive,
    checkboxToolTip,
    handleCheckedChanged
  );

  const filenameTextfieldrops = useInputTextFieldProps(
    false,
    true,
    mapping.source,
    true,
    "Fielname"
  );

  const columns = React.useMemo((): JSX.Element[] => {
    return [
      <Grid
        xs={1}
        key={columnDefinitions[0].id}
        item
        style={{ maxWidth: "50px" }}
      >
        <InputCheckbox {...checkboxProps} />
      </Grid>,
      <Grid
        xs={10}
        item
        style={{
          marginLeft: "16px",
        }}
        key={columnDefinitions[1].id}
      >
        <InputTextField {...filenameTextfieldrops} />
      </Grid>,
    ];
  }, [filenameTextfieldrops, columnDefinitions, checkboxProps]);

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0",
        padding: "8px",
      }}
    >
      {columns.map((col) => {
        return col;
      })}
    </Grid>
  );
};

export default FileUploadListItem;
