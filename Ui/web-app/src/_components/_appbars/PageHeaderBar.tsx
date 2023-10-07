import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { onLanguageChange, supportedLanguages } from "src/_lib/_locale/locale";
import { IDropdownItem } from "src/_lib/_intefaces/IDropdownItem";
import { useInputDropdownProps } from "../_componentHooks/useInputDropdownProps";
import InputDropdown from "../_input/InputDropDown";
import { MenuRounded } from "@mui/icons-material";
import SideMenu, { ISidemenuProps } from "../_menu/SideMenu";
import { UseApi } from "src/_hooks/useApi";
import { ISideMenu } from "../_menu/jsonInterfaces";

interface IProps {
  pageTitle: string;
}

const controller = `${process.env.REACT_APP_API_URL}SideMenu/`;

const PageHeader: React.FC<IProps> = (props) => {
  const { pageTitle } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleIsLoading = React.useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const { publicMenuApi } = {
    publicMenuApi: UseApi<ISideMenu>(
      handleIsLoading,
      `${controller}GetPublicMenu`,
      "",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": `application/json`,
        },
      }
    ),
  };

  const [menu, setMenu] = React.useState<ISidemenuProps>({
    anchor: "left",
    open: false,
  });

  const toggleMenue = React.useCallback(
    (e: React.KeyboardEvent | React.MouseEvent, open: boolean) => {
      if (
        e.type === "keydown" &&
        ((e as React.KeyboardEvent).key === "Tab" ||
          (e as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      console.log("OPEN:", open);
      setMenu({ ...menu, open: open });
    },
    [menu]
  );

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
          disabled={isLoading}
          aria-label="app_menu"
          onClick={(e) => toggleMenue(e, true)}
          sx={{ mr: 2 }}
        >
          <MenuRounded />
        </IconButton>
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
      <SideMenu
        menu={menu}
        menuData={publicMenuApi.response ?? ({} as ISideMenu)}
        toggleMenu={toggleMenue}
      />
    </AppBar>
  );
};

export default PageHeader;
