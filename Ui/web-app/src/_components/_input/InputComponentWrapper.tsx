import { Box } from "@mui/material";
import React from "react";

interface IProps {
  spacing: number;
  children: JSX.Element;
}

const InputComponentWrapper: React.FC<IProps> = (props) => {
  const { spacing, children } = props;

  return <Box sx={{ margin: `${spacing}rem` }}>{children}</Box>;
};

export default InputComponentWrapper;
