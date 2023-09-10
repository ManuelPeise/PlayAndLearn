import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { IUseInputTextfieldProps } from "../_componentHooks/useInputTextFieldProps";

interface IProps extends IUseInputTextfieldProps {
  hasIcon?: boolean;
  iconPosition?: "start" | "end";
  icon?: JSX.Element;
  handleTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextField: React.FC<IProps> = (props) => {
  const {
    autocomplete,
    fullwidth,
    readonly,
    value,
    placeholder,
    hasIcon,
    iconPosition,
    icon,
    inputProps,
    inputPropsBase,
    handleTextChanged,
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
      <TextField
        id="inpit-text-field"
        autoComplete={autocomplete}
        fullWidth={fullwidth}
        placeholder={placeholder}
        variant="standard"
        value={value}
        disabled={readonly}
        inputProps={inputPropsBase}
        InputProps={
          inputProps ?? {
            startAdornment: hasIcon && iconPosition === "start" && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment: hasIcon && iconPosition === "end" && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }
        }
        onChange={handleTextChanged}
      />
    </Box>
  );
};

export default InputTextField;
