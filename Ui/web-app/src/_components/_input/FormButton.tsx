import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface IProps {
  text: string;
  disabled: boolean;
  fontsize?: number;
  backgroundColor?: string;
  textColor?: string;
  xs?: number;
  variant: "contained" | "text" | "outlined";
  handleClick: () => Promise<void> | void;
}

const FormButton: React.FC<IProps> = (props) => {
  const {
    text,
    disabled,
    variant,
    xs,
    fontsize,
    backgroundColor,
    textColor,
    handleClick,
  } = props;

  return (
    <Grid
      item
      xs={xs ?? 12}
      style={{ display: "flex", justifyContent: "center", margin: "16px" }}
    >
      <Button
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          fontSize: `${fontsize}px`,
        }}
        disabled={disabled}
        variant={variant}
        onClick={handleClick}
      >
        {text}
      </Button>
    </Grid>
  );
};

export default FormButton;
