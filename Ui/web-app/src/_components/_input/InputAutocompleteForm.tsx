import { Autocomplete, Box } from "@mui/material";
import React from "react";
import { IUseInputTextfieldProps } from "../_componentHooks/useInputTextFieldProps";
import InputTextField from "./InputTextField";

interface IProps extends IUseInputTextfieldProps {
  items: string[];
}

const InputAutocompleteForm: React.FC<IProps> = (props) => {
  const {
    items,
    value,
    fullwidth,
    handleTextChanged,
    handleTextExternalChanged,
  } = props;

  const autocompleteChanged = React.useCallback(
    (e: React.SyntheticEvent<Element, Event>, selected: string | null) => {
      handleTextExternalChanged(selected ?? value);
    },
    [value, handleTextExternalChanged]
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
        fullWidth={fullwidth}
        disablePortal
        noOptionsText="-"
        value={value}
        options={items}
        onChange={autocompleteChanged}
        renderInput={(params) => (
          <InputTextField
            {...props}
            inputPropsBase={params.inputProps}
            inputProps={params.InputProps}
            fullwidth={params.fullWidth}
            readonly={params.disabled}
            value={value}
            handleTextChanged={handleTextChanged}
          />
        )}
      />
    </Box>
  );
};

export default InputAutocompleteForm;
