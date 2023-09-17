import { ListItem, ListItemText, Switch } from "@mui/material";
import React from "react";

interface IProps {
  checked: boolean;
  readonly?: boolean;
  hasDivider?: boolean;
  listItemText: string;
  paddingLeft?: number;
  onChanged: (checked: boolean) => void;
}

const SwitchListItem: React.FC<IProps> = (props) => {
  const {
    readonly,
    checked,
    hasDivider,
    listItemText,
    paddingLeft,
    onChanged,
  } = props;

  const handleCheckedChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      onChanged(isChecked);
    },
    [onChanged]
  );

  return (
    <ListItem divider={hasDivider}>
      <ListItemText sx={{ paddingLeft: `${paddingLeft}rem`, fontSize: "1rem" }}>
        {listItemText}
      </ListItemText>
      <Switch
        color="secondary"
        checked={checked ?? false}
        disabled={readonly}
        onChange={handleCheckedChange}
      />
    </ListItem>
  );
};

export default SwitchListItem;
