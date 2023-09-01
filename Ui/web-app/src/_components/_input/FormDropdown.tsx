import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IDropdownItem } from "../../_lib/_intefaces/IDropdownItem";

interface IProps {
  label: string;
  selectedKey: number;
  items: IDropdownItem[];
  hasDisabledItem: boolean;
  onChange: (value: number) => void;
}

const FormDropdown: React.FC<IProps> = (props) => {
  const { label, selectedKey, items, hasDisabledItem, onChange } = props;

  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      onChange(parseInt(event.target.value as string));
    },
    [onChange]
  );

  return (
    <Box padding={2} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-select-label">{label}</InputLabel>
        <Select
          labelId="dropdown-select-label"
          id="dropdown-select"
          value={selectedKey.toString()}
          label={label}
          onChange={handleChange}
        >
          {items.map((item) => {
            return (
              <MenuItem
                key={item.key}
                value={item.key}
                disabled={hasDisabledItem && item.key === 0}
                selected={item.key === selectedKey}
              >
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormDropdown;
