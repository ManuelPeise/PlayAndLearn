import { IDropdownItem } from "src/_lib/_intefaces/IDropdownItem";
import React from "react";
import { SelectChangeEvent } from "@mui/material";

export interface IInputDropdownProps {
  fullWidth?: boolean;
  readOnly?: boolean;
  selectedKey: number;
  items: IDropdownItem[];
  color?: string;
  toolTip?: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export const useInputDropdownProps = (
  readOnly: boolean,
  fullWidth: boolean,
  selectedKey: number,
  items: IDropdownItem[],
  toolTip?: string,
  color?: string,
  callBack?: (value: number) => void
): IInputDropdownProps => {
  const [value, setValue] = React.useState<number>(selectedKey);

  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      setValue(parseInt(event.target.value as string));
      console.log(event.target.value);
      if (callBack !== undefined) {
        callBack(parseInt(event.target.value));
      }
    },
    [callBack]
  );

  return {
    readOnly,
    fullWidth,
    selectedKey: value,
    items,
    color,
    toolTip,
    handleChange,
  };
};
