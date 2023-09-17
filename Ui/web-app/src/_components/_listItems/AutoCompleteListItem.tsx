import React from "react";
import { ListItem, Autocomplete, TextField, ListItemText } from "@mui/material";

interface IProps {
  readonly: boolean;
  items: string[];
  value: string;
  inputValue: string;
  noOptionLabel?: string;
  label: string;
  fullwidth?: boolean;
  placeholder?: string;
  hasDivider?: boolean;
  handleChange: (value: string) => void;
  handleTextChanged: (value: string) => void;
}

const AutoCompleteListItem: React.FC<IProps> = (props) => {
  const {
    readonly,
    fullwidth,
    label,
    items,
    noOptionLabel,
    inputValue,
    value,
    placeholder,
    hasDivider,
    handleChange,
    handleTextChanged,
  } = props;

  const handleAutocompleteChanged = React.useCallback(
    (e: React.SyntheticEvent<Element, Event>, value: string | null) => {
      if (value != null) handleChange(value);
    },
    [handleChange]
  );

  const handleInputTextChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleTextChanged(e.currentTarget.value);
    },
    [handleTextChanged]
  );

  return (
    <ListItem divider={hasDivider}>
      <ListItemText sx={{ paddingLeft: ".5rem", fontSize: "1rem" }}>
        {label}
      </ListItemText>
      <Autocomplete
        sx={{ paddingLeft: "2rem" }}
        readOnly={readonly}
        defaultValue={null}
        fullWidth={fullwidth}
        options={items}
        getOptionLabel={(item) => item}
        noOptionsText={noOptionLabel ?? "-"}
        id="auto-complete"
        value={value || null}
        onChange={handleAutocompleteChanged}
        renderInput={(params) => (
          <TextField
            sx={{ minWidth: "10rem" }}
            fullWidth={fullwidth}
            variant="standard"
            inputProps={params.inputProps}
            InputProps={params.InputProps}
            value={inputValue}
            onChange={handleInputTextChanged}
            placeholder={placeholder}
          />
        )}
      />
    </ListItem>
  );
};

export default AutoCompleteListItem;
