import { StarBorder, StarRate } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import InputButton from "src/_components/_input/InputButton";
import { DialogTransitionUp } from "src/_components/_dialogs/DialogTranstion";
import { IStar } from "src/_lib/_intefaces/IRate";

interface IProps {
  open: boolean;
  rating: IStar[];
  attemts: number;
  handleSaveScoreAndCloseDialog: () => Promise<void>;
}

const MemorySinglePlayerResultDialog: React.FC<IProps> = (props) => {
  const { open, rating, attemts, handleSaveScoreAndCloseDialog } = props;

  const { t } = useTranslation();

  const title = React.useMemo(() => {
    return t("memory:labelGameEnd");
  }, [t]);

  const resultLabel = React.useMemo(() => {
    return t("memory:labelGameResult").replace("attemts", `${attemts}`);
  }, [t, attemts]);

  const buttonLabel = React.useMemo(() => {
    return t("memory:labelOK");
  }, [t]);

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {rating && (
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            {rating.map((star, index) => {
              if (star.color === "yellow") {
                return (
                  <StarRate
                    key={index}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      color: star.color,
                    }}
                  />
                );
              } else {
                return (
                  <StarBorder
                    key={index}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  />
                );
              }
            })}
          </Grid>
        )}
        <DialogContentText>{resultLabel}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          readonly={false}
          text={buttonLabel}
          handleClick={handleSaveScoreAndCloseDialog}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MemorySinglePlayerResultDialog;
