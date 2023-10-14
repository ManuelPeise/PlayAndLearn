import React from "react";
import { ISideMenuItem } from "./jsonInterfaces";
import { ListItem, ListItemIcon } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  item: ISideMenuItem;
  toggleMenu: (
    e: React.KeyboardEvent | React.MouseEvent,
    open: boolean
  ) => void;
}

const SideMenuItem: React.FC<IProps> = (props) => {
  const { item, toggleMenu } = props;

  const { t } = useTranslation();

  return (
    <ListItem
      className="side-menu-item"
      onClick={(e: React.KeyboardEvent | React.MouseEvent) =>
        toggleMenu(e, false)
      }
    >
      <ListItemIcon></ListItemIcon>
      <Link className="side-menu-item-text" to={item.route}>
        {t(`common:${item.title}`)}
      </Link>
    </ListItem>
  );
};

export default SideMenuItem;
