import { Box, Drawer } from "@mui/material";
import React from "react";

type Anchor = "left";

export interface ISidemenuProps {
  anchor: Anchor;
  open: boolean;
}

interface IProps {
  menu: ISidemenuProps;
  toggleMenu: (
    e: React.KeyboardEvent | React.MouseEvent,
    open: boolean
  ) => void;
}

const SideMenu: React.FC<IProps> = (props) => {
  const { menu, toggleMenu } = props;

  const sideMenu = React.useMemo(() => {
    return (
      <Box
        sx={{ width: "auto" }}
        role="presentation"
        onClick={(e: React.KeyboardEvent | React.MouseEvent) =>
          toggleMenu(e, false)
        }
        onKeyDown={(e: React.KeyboardEvent | React.MouseEvent) =>
          toggleMenu(e, false)
        }
      ></Box>
    );
  }, [toggleMenu]);

  return (
    <Drawer
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
