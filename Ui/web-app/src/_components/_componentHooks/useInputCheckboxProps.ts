import React from "react";

export interface IInputCheckboxProps {
  checked: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  toolTip?: string;
  callBack?: (checked: boolean) => void;
}

export const useInputCheckboxProps = (
  defaultValue: boolean,
  toolTip?: string,
  callBack?: (checked: boolean) => void
): IInputCheckboxProps => {
  const [isChecked, setIsChecked] = React.useState<boolean>(defaultValue);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setIsChecked(checked);

      if (callBack !== undefined) {
        callBack(checked);
      }
    },
    [callBack]
  );

  return {
    checked: isChecked,
    toolTip,
    handleChange,
  };
};
