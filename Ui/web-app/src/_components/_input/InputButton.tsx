import React from "react";
import { IInputButtonProps } from "../_componentHooks/useInputButtonProps";
import { Box, Button } from "@mui/material";

interface IProps extends IInputButtonProps {
  buttonWidth?: string;
}

const InputButton: React.FC<IProps> = (props) => {
  const {
    buttonType,
    text,
    variant,
    readonly,
    children,
    buttonWidth,
    handleClick,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        minWidth: "1.5rem",
        minHeight: "1.5rem",
      }}
    >
      <Button
        sx={{ width: buttonWidth !== undefined ? buttonWidth : "auto" }}
        type="file"
        component={buttonType}
        id="input-button"
        variant={variant}
        disabled={readonly}
        onClick={handleClick}
      >
        {children}
        {text}
      </Button>
    </Box>
  );
};

export default InputButton;
