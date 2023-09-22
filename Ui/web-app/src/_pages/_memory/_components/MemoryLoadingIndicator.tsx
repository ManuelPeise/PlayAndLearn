import { FormLabel, Grid } from "@mui/material";
import React from "react";

interface IProps {
  value: string;
  marginTop: number;
}

const MemoryLoadingIndicator: React.FC<IProps> = (props) => {
  const { value, marginTop } = props;
  return (
    <Grid
      item
      xs={6}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: `${marginTop}rem`,
        opacity: ".5",
        padding: "1rem",
        borderRadius: "16px",
        fontSize: "2rem",
      }}
      container
    >
      <FormLabel>{value}</FormLabel>
    </Grid>
  );
};

export default MemoryLoadingIndicator;
