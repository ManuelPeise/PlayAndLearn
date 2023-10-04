import { Grid, ListItem } from "@mui/material";
import React from "react";
import { IMemoryFileMapping } from "../_interfaces/IMemoryFileMapping";
import MemoryFileChip from "./MemoryFileChip";

interface IProps {
  files: IMemoryFileMapping[];
  handleDeleteFile: (mapping: IMemoryFileMapping) => void;
}

const MemoryFileChipListItem: React.FC<IProps> = (props) => {
  const { files, handleDeleteFile } = props;
  console.log("files:", files);

  return (
    <ListItem>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {files.map((mapping) => {
          return (
            <MemoryFileChip
              key={mapping.key}
              mapping={mapping}
              handleDeleteFile={handleDeleteFile}
            />
          );
        })}
      </Grid>
    </ListItem>
  );
};

export default MemoryFileChipListItem;
