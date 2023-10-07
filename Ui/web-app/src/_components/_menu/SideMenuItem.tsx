import React from "react";
import { ISideMenuItem } from "./jsonInterfaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  item: ISideMenuItem;
}

const SideMenuItem: React.FC<IProps> = (props) => {
  const { item } = props;

  const { t } = useTranslation();

  return (
    <Accordion className="side-menu-item">
      <AccordionSummary sx={{ padding: 0, margin: 0 }}>
        <ListItem className="side-menu-list-item">
          <ListItemIcon></ListItemIcon>
          <Typography className="side-menu-item-text">
            {t(`common:${item.title}`)}
          </Typography>
        </ListItem>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, margin: 0 }}>
        <List sx={{ padding: 0, margin: 0 }}>
          {item?.items?.map((subItem, key) => {
            return (
              <ListItem className="side-menu-sub-item" key={key}>
                <ListItemIcon></ListItemIcon>
                <Link className="side-menu-sub-item-link" to={subItem.route}>
                  {t(`common:${subItem.title}`)}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default SideMenuItem;
