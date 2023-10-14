import { Box, Drawer, List } from "@mui/material";
import React from "react";
import { ISideMenu } from "./jsonInterfaces";
import SideMenuHeader from "./SideMenuHeader";
import "./menuStyle.css";
import SideMenuItem from "./SideMenuItem";

type Anchor = "left";

export interface ISidemenuProps {
  anchor: Anchor;
  open: boolean;
}

interface IProps {
  menu: ISidemenuProps;
  menuData: ISideMenu;
  toggleMenu: (
    e: React.KeyboardEvent | React.MouseEvent,
    open: boolean
  ) => void;
}

const SideMenu: React.FC<IProps> = (props) => {
  const { menu, menuData, toggleMenu } = props;

  const sideMenu = React.useMemo(() => {
    return (
      <Box
        sx={{ backgroundColor: "lightgray" }}
        color="primary"
        role="presentation"
      >
        <List className="menu-list">
          <SideMenuHeader data={menuData.menuHeader} toggleMenu={toggleMenu} />
          {menuData?.items?.map((item, key) => {
            return (
              <SideMenuItem key={key} item={item} toggleMenu={toggleMenu} />
            );
          })}
        </List>
      </Box>
    );
  }, [menuData, toggleMenu]);

  return (
    <Drawer
      className="menu-drawer"
      open={menu.open}
      anchor={menu.anchor}
      onClose={(e: React.KeyboardEvent | React.MouseEvent) =>
        toggleMenu(e, true)
      }
    >
      {sideMenu}
    </Drawer>
  );
};

export default SideMenu;
