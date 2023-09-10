import React from "react";
import { List } from "@mui/material";
import { ITableColumn } from "../../../_lib/_intefaces/ITableColumn";
import { TableCellTypeEnum } from "../../../_lib/_enums/TableCellTypeEnum";
import FileUploadListItem from "./FileUploadListItem";
import { IUseFileUploadResult } from "../../../_hooks/useFileUpload";

interface IProps {
  hasStickyHeader: boolean;
  fileUploadHandler: IUseFileUploadResult;
}

export interface IFileUploadTableColumn extends ITableColumn {
  id: "isActive" | "source" | "target" | "fileType";
  displayed: boolean;
  columnType: TableCellTypeEnum;
}

const columnDefinitions: IFileUploadTableColumn[] = [
  {
    id: "isActive",
    label: "Importieren",
    minwidth: 30,
    alignContent: "left",
    columnType: TableCellTypeEnum.Checkbox,
    displayed: true,
  },
  {
    id: "source",
    label: "Dateiname",
    minwidth: 150,
    alignContent: "center",
    columnType: TableCellTypeEnum.TextField,
    displayed: true,
  },
  {
    id: "target",
    label: "Target",
    minwidth: 10,
    alignContent: "center",
    columnType: TableCellTypeEnum.TextField,
    displayed: true,
  },
  {
    id: "fileType",
    label: "DateiType",
    minwidth: 150,
    alignContent: "center",
    columnType: TableCellTypeEnum.DropDown,
    displayed: true,
  },
];

const FileUploadList: React.FC<IProps> = (props) => {
  const { fileUploadHandler } = props;

  return (
    <List>
      {fileUploadHandler.fileMappings.map((item) => (
        <FileUploadListItem
          key={item.key}
          fileUploadHandler={fileUploadHandler}
          mapping={item}
          columnDefinitions={columnDefinitions}
        />
      ))}
    </List>
  );
};

export default FileUploadList;
