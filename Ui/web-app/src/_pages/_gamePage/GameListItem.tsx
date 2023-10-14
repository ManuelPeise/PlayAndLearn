import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  to: string;
  icon: JSX.Element;
}

const GameListItem: React.FC<IProps> = (props) => {
  const { title, to, icon } = props;

  return (
    <ListItem className="game-list-item">
      <Link className="game-list-item-link" to={to}>
        <ListItemAvatar className="game-list-item-avatar">
          <Avatar className="game-list-item-avatar">{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText className="game-list-item-text">{title}</ListItemText>
      </Link>
    </ListItem>
  );
};

export default GameListItem;
