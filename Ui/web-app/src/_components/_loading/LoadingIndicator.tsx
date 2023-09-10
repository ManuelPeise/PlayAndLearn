import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface IProps {
  isLoading: boolean;
}

const Loadingindicator: React.FC<IProps> = (props) => {
  const { isLoading } = props;

  return (
    <Box sx={{ width: "100vw", height: ".5rem", padding: "1px" }}>
      {isLoading && <LinearProgress color="warning" />}
    </Box>
  );
};

export default Loadingindicator;
