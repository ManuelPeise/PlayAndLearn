import { Grid, ListItem } from "@mui/material";
import React from "react";
import InputButton from "../_input/InputButton";

interface IProps {
  saveValue: string;
  saveDisabled: boolean;
  cancelValue?: string;
  cancelDisabled?: boolean;
  onCancel?: () => void;
  onSave: () => Promise<void>;
}

const letterWidthInPixel = 16;

const SaveCancelListItem: React.FC<IProps> = (props) => {
  const {
    saveValue,
    saveDisabled,
    cancelValue,
    cancelDisabled,
    onCancel,
    onSave,
  } = props;

  const buttonWidth = React.useMemo(() => {
    const length = Math.max(saveValue.length, cancelValue?.length ?? 0);

    return `${length * letterWidthInPixel}px`;
  }, [saveValue.length, cancelValue?.length]);

  return (
    <ListItem sx={{ padding: "0" }} divider={false}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "2rem" }}
        columnSpacing={3}
      >
        {cancelValue !== undefined && (
          <Grid item>
            <InputButton
              buttonWidth={buttonWidth}
              readonly={cancelDisabled ?? true}
              buttonType="button"
              text={cancelValue}
              variant="contained"
              handleClick={onCancel !== undefined ? onCancel : () => {}}
            />
          </Grid>
        )}
        <Grid item>
          <InputButton
            buttonWidth={buttonWidth}
            readonly={saveDisabled ?? true}
            buttonType="button"
            text={saveValue}
            variant="contained"
            handleClick={onSave}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default SaveCancelListItem;
