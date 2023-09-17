import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

interface IProps {
  fullwidth?: boolean;
  items: string[];
  autoCompleteValue: string;
  inputValue: string;
  placeholder?: string;
  noOptionsLabel?: string;
  onAutocompleteChanged: (value: string) => void;
  onTextChanged: (value: string) => void;
}

const InputAutocompleteForm: React.FC<IProps> = (props) => {
  const {
    items,
    inputValue,
    autoCompleteValue,
    fullwidth,
    placeholder,
    noOptionsLabel,
    onAutocompleteChanged,
    onTextChanged,
  } = props;

  console.log("input:", inputValue, autoCompleteValue);
  const handleAutocompleteChanged = React.useCallback(
    (e: React.SyntheticEvent<Element, Event>, selected: string | null) => {
      if (selected != null) onAutocompleteChanged(selected);
    },
    [onAutocompleteChanged]
  );

  const handleTextChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTextChanged(e.currentTarget.value as string);
    },
    [onTextChanged]
  );

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
      <Autocomplete
        defaultValue={null}
        fullWidth={fullwidth}
        options={items}
        getOptionLabel={(item) => item}
        noOptionsText={noOptionsLabel ?? "-"}
        id="auto-complete"
        value={autoCompleteValue || null}
        onChange={handleAutocompleteChanged}
        renderInput={(params) => (
          <TextField
            fullWidth={fullwidth}
            variant="standard"
            inputProps={params.inputProps}
            InputProps={params.InputProps}
            value={inputValue}
            onChange={handleTextChanged}
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
};

export default InputAutocompleteForm;
