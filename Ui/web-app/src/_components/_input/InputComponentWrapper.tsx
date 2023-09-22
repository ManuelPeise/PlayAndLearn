import { Grid } from "@mui/material";
import React from "react";

interface IProps {
  children: JSX.Element;
  className?: string;
}

const InputComponentWrapper: React.FC<IProps> = (props) => {
  const { children, className } = props;

  return <Grid className={className}>{children}</Grid>;
};

export default InputComponentWrapper;
