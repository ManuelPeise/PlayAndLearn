import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { onLanguageChange, supportedLanguages } from "src/_lib/_locale/locale";
import { IDropdownItem } from "src/_lib/_intefaces/IDropdownItem";
import { useInputDropdownProps } from "../_componentHooks/useInputDropdownProps";
import InputDropdown from "../_input/InputDropDown";

interface IProps {
  pageTitle: string;
}

const PageHeader: React.FC<IProps> = (props) => {
  const { pageTitle } = props;

  const availableLanguages = React.useMemo(() => {
    const languages: IDropdownItem[] = [];

    Object.keys(supportedLanguages).forEach((lang, index) => {
      languages.push({ key: index, value: lang });
    });

    return languages;
  }, []);

  const inputDropdownProps = useInputDropdownProps(
    false,
    false,
    0,
    availableLanguages,
    [],
    undefined,
    "#ffffff",
    onLanguageChange
  );

  return (
    <AppBar color="secondary" position="static" elevation={0}>
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="app_menu"
          sx={{ mr: 2 }}
        />
        <Typography
          color="#ffffff"
          variant="caption"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {pageTitle}
        </Typography>
        <InputDropdown {...inputDropdownProps} minWidth={-5} />
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
