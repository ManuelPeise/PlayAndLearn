import React from "react";
import { ISideMenuHeader } from "./jsonInterfaces";
import { useTranslation } from "react-i18next";
import { ListItem, ListItemIcon, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";

interface IProps {
  data: ISideMenuHeader;
  toggleMenu: (
    e: React.KeyboardEvent | React.MouseEvent,
    open: boolean
  ) => void;
}

const SideMenuHeader: React.FC<IProps> = (props) => {
  const { data, toggleMenu } = props;
  const { t } = useTranslation();

  const appTitle = React.useMemo(() => {
    return t(`common:${data?.menuTitle}`);
  }, [t, data]);

  return (
    <ListItem className="menu-header-list-item">
      <ListItemIcon
        className="menu-icon"
        onClick={(e: React.KeyboardEvent | React.MouseEvent) =>
          toggleMenu(e, false)
        }
      >
        <ArrowBackRounded className="close-icon" />
      </ListItemIcon>
      <Typography className="menu-header-title">{appTitle}</Typography>
    </ListItem>
  );
};

export default SideMenuHeader;
