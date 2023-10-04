import { Chip, Grid, Tooltip } from "@mui/material";
import React from "react";
import { IMemoryFileMapping } from "../_interfaces/IMemoryFileMapping";
import { DeleteRounded } from "@mui/icons-material";

interface IProps {
  mapping: IMemoryFileMapping;
  handleDeleteFile: (mapping: IMemoryFileMapping) => void;
}

const MemoryFileChip: React.FC<IProps> = (props) => {
  const { mapping, handleDeleteFile } = props;

  const handleDelete = React.useCallback(() => {
    console.log("try delete item...", mapping.key);
    handleDeleteFile(mapping);
  }, [handleDeleteFile, mapping]);

  return (
    <Grid sx={{ margin: "0", padding: "0" }} item key={mapping.key}>
      <Tooltip title={mapping.fileName}>
        <Chip
          sx={{
            maxWidth: "8rem",
            color: mapping.color,
            border: `1px solid ${mapping.color}`,
            backgroundColor: "transparent",
          }}
          label={mapping.fileName}
          onDelete={handleDelete}
          deleteIcon={<DeleteRounded />}
        />
      </Tooltip>
    </Grid>
  );
};

export default MemoryFileChip;
