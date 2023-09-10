import { InputBaseProps } from "@mui/material";
import React from "react";

export interface IUseInputTextfieldProps {
  autocomplete: "on" | "off";
  fullwidth: boolean;
  readonly: boolean;
  value: string;
  placeholder: string;
  hasIcon?: boolean;
  iconPosition?: "start" | "end";
  icon?: JSX.Element;
  inputPropsBase?: React.InputHTMLAttributes<HTMLInputElement>;
  inputProps?: Partial<InputBaseProps>;
  handleTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextExternalChanged: (value: string) => void;
}

export const useInputTextFieldProps = (
  isAutoComplete: boolean,
  fullwidth: boolean,
  defaultValue: string,
  isReadonly: boolean,
  placeholder: string,
  hasIcon?: boolean,
  iconPosition?: "start" | "end",
  icon?: JSX.Element
): IUseInputTextfieldProps => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const handleTextChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value as string);
    },
    []
  );

  const handleTextExternalChanged = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  return {
    autocomplete: isAutoComplete ? "on" : "off",
    fullwidth,
    placeholder,
    readonly: isReadonly,
    value,
    hasIcon,
    iconPosition,
    icon,
    handleTextChanged,
    handleTextExternalChanged,
  };
};
