import { FormLabel, ListItem, ListItemText } from "@mui/material";
import React from "react";
import InputIconButton from "../_input/InputIconButton";

interface IProps {
  title: string;
  readonly?: boolean;
  hasDivider?: boolean;
  toolTipLabel?: string;
  icon?: JSX.Element;
  onClick?: () => Promise<void> | void;
}

const TitleListItem: React.FC<IProps> = (props) => {
  const { title, readonly, hasDivider, toolTipLabel, icon, onClick } = props;

  return (
    <ListItem
      divider={hasDivider}
      sx={{ padding: "0px", marginTop: "1rem", marginBottom: "1rem" }}
    >
      <ListItemText>
        <FormLabel>{title}</FormLabel>
      </ListItemText>
      {icon && toolTipLabel && onClick && (
        <InputIconButton
          marginRight={1.5}
          readonly={readonly}
          toolTipText={toolTipLabel}
          icon={icon}
          handleClick={onClick}
        />
      )}
    </ListItem>
  );
};

export default TitleListItem;
