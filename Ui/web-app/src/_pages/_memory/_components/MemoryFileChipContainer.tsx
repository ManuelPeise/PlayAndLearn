import React from "react";
import { IMemoryFileMapping } from "../_intefaces/IMemoryFileMapping";
import { Grid } from "@mui/material";
import MemoryFileFormChip from "./MemoryFileFormChip";

interface IProps {
  fileMappings: IMemoryFileMapping[];
  handleDeleteFile: (mapping: IMemoryFileMapping) => void;
}

const MemoryFileChipContainer: React.FC<IProps> = (props) => {
  const { fileMappings, handleDeleteFile } = props;

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "1rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      {fileMappings?.map((mapping) => {
        return (
          <MemoryFileFormChip
            key={mapping.key}
            mapping={mapping}
            handleDeleteFile={handleDeleteFile}
          />
        );
      })}
    </Grid>
  );
};

export default MemoryFileChipContainer;
