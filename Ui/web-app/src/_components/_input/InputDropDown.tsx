import React from "react";
import { IInputDropdownProps } from "../_componentHooks/useInputDropdownProps";
import { Box, Select, MenuItem, Tooltip } from "@mui/material";

interface IProps extends IInputDropdownProps {
  minWidth?: number;
}

const InputDropdown: React.FC<IProps> = (props) => {
  const {
    readOnly,
    items,
    selectedKey,
    disabledItems,
    fullWidth,
    color,
    toolTip,
    minWidth,
    handleChange,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: minWidth !== undefined ? `${minWidth}rem` : `1.5rem`,
        minHeight: "1.5rem",
      }}
    >
      {toolTip ? (
        <Tooltip title={toolTip} placement="top">
          <Select
            sx={{
              color: color,
              outline: "none",
              width: minWidth !== undefined ? `${minWidth}rem` : `1.5rem`,
              ".MuiSvgIcon-root": {
                fill: `${color}!important`,
              },
              "&:before": {
                borderBottom: `.1rem solid ${color}`,
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: `.1rem solid ${color}`,
              },
              "&:focus:not(.Mui-disabled):after": {
                borderBottom: `.1rem solid ${color}`,
              },
            }}
            id="input-dropdown"
            variant="standard"
            fullWidth={fullWidth}
            disabled={readOnly}
            value={selectedKey.toString()}
            onChange={handleChange}
          >
            {items.map((item) => {
              return (
                <MenuItem
                  key={item.key}
                  value={item.key}
                  disabled={
                    disabledItems.includes(item.key) || selectedKey === item.key
                  }
                  selected={item.key === selectedKey}
                >
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
        </Tooltip>
      ) : (
        <Select
          sx={{
            color: color,
            outline: "none",
            ".MuiSvgIcon-root": {
              fill: `${color}!important`,
            },
            "&:before": {
              borderBottom: `.1rem solid ${color}`,
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: `.1rem solid ${color}`,
            },
            "&:focus:not(.Mui-disabled):after": {
              borderBottom: `.1rem solid ${color}`,
            },
          }}
          id="input-dropdown"
          variant="standard"
          fullWidth={fullWidth}
          disabled={readOnly}
          value={selectedKey.toString()}
          onChange={handleChange}
        >
          {items.map((item) => {
            return (
              <MenuItem
                key={item.key}
                value={item.key}
                disabled={
                  disabledItems.includes(item.key) || selectedKey === item.key
                }
                selected={item.key === selectedKey}
              >
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </Box>
  );
};

export default InputDropdown;
