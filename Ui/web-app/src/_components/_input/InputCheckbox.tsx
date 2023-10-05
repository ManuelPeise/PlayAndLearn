import React from "react";
import { IInputCheckboxProps } from "../_componentHooks/useInputCheckboxProps";
import { Box, Checkbox, Tooltip } from "@mui/material";

interface IProps extends IInputCheckboxProps {}

const InputCheckbox: React.FC<IProps> = (props) => {
  const { checked, toolTip, handleChange } = props;

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
      {toolTip ? (
        <Tooltip title={toolTip} placement="top">
          <Checkbox
            id="input-checkbox"
            color="secondary"
            checked={checked}
            onChange={handleChange}
          />
        </Tooltip>
      ) : (
        <Checkbox
          id="input-checkbox"
          color="secondary"
          checked={checked}
          onChange={handleChange}
        />
      )}
    </Box>
  );
};

export default InputCheckbox;
