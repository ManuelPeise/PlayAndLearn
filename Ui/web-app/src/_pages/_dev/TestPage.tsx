import React from "react";
import { useInputTextFieldProps } from "src/_components/_componentHooks/useInputTextFieldProps";
import InputTextField from "src/_components/_input/InputTextField";
import PageLayout from "../PageLayout";
import { AccountBalance } from "@mui/icons-material";
import { useInputCheckboxProps } from "src/_components/_componentHooks/useInputCheckboxProps";
import InputCheckbox from "src/_components/_input/InputCheckbox";
import { useInputDropdownProps } from "src/_components/_componentHooks/useInputDropdownProps";
import InputDropdown from "src/_components/_input/InputDropDown";
import { useInputButtonProps } from "src/_components/_componentHooks/useInputButtonProps";
import InputButton from "src/_components/_input/InputButton";

const TestPage: React.FC = () => {
  const testProps = useInputTextFieldProps(
    false,
    false,
    "",
    false,
    "Test Placeholder",
    true,
    "start",
    <AccountBalance />
  );

  const checkboxprops = useInputCheckboxProps(false, "Das ist ein Test");

  const dropdownProps = useInputDropdownProps(false, true, 0, [
    { key: 0, value: "wählen", disabled: true },
    { key: 1, value: "Item 1", disabled: false },
  ]);

  const buttonProps = useInputButtonProps(
    "text",
    "Test",
    false,
    "contained",
    () => {}
  );
  return (
    <PageLayout
      pageTitle="DEV"
      pageBody={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <InputCheckbox {...checkboxprops} />
          <InputTextField {...testProps} />
          <InputDropdown {...dropdownProps} />
          <InputButton {...buttonProps} />
        </div>
      }
    />
  );
};

export default TestPage;
