import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface IProps {
  icon: JSX.Element;
  marginRight?: number;
  marginLeft?: number;
  readonly?: boolean;
  toolTipText?: string;
  handleClick: () => Promise<void> | void;
}

const InputIconButton: React.FC<IProps> = (props) => {
  const { icon, readonly, marginLeft, marginRight, toolTipText, handleClick } =
    props;

  const iconComponent = React.useMemo(() => {
    return icon;
  }, [icon]);

  return (
    <Tooltip title={toolTipText}>
      <IconButton
        disabled={readonly}
        sx={{
          marginLeft: `${marginLeft}rem`,
          marginRight: `${marginRight}rem`,
        }}
        onClick={handleClick}
      >
        {iconComponent}
      </IconButton>
    </Tooltip>
  );
};

export default InputIconButton;
