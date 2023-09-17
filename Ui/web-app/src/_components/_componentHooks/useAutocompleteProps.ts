import { InputBaseProps } from "@mui/material";
import React from "react";

export interface IUseInputAutoCompleteProps {
  autocomplete: "on" | "off";
  fullwidth: boolean;
  readonly: boolean;
  textValue: string;
  value: string;
  placeholder: string;
  Items: string[];
  inputPropsBase?: React.InputHTMLAttributes<HTMLInputElement>;
  inputProps?: Partial<InputBaseProps>;
  handleTextChanged: (value: string) => void;
  handleAutoCompleteChanged: (value: string) => void;
}
