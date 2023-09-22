import React from "react";
import { IMemoryCard } from "./_intefaces/IMemoryCard";
import MemoryCard from "./_components/MemoryCard";
import {
  DialogContent,
  DialogContentText,
  FormLabel,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MemoryDialog from "./_components/MemoryDialog";
import { IStar } from "src/_lib/_intefaces/IRate";
import { StarRate, StarBorder } from "@mui/icons-material";

interface IProps {
  isLoading: boolean;
  attemts: number;
  resultDialogOpen: boolean;
  rating: IStar[] | null;
  cards: IMemoryCard[];
  choiseOne: IMemoryCard | null;
  choiseTwo: IMemoryCard | null;
  currentPlayerLabel?: string;
  gameIsRunning: boolean;
  memoryLoadingIndicatorVisible: boolean;
  handleChoice: (card: IMemoryCard) => void;
  handleResultDialogClose: () => void;
}

const MemoryGameContainer: React.FC<IProps> = (props) => {
  // eslint-disable-next-line
  const {
    rating,
    attemts,
    resultDialogOpen,
    choiseOne,
    choiseTwo,
    cards,
    currentPlayerLabel,
    gameIsRunning,
    memoryLoadingIndicatorVisible,
    handleChoice,
    handleResultDialogClose,
  } = props;
  const { t } = useTranslation();

  const gameResultDialogContext = React.useMemo(() => {
    return (
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
        <DialogContentText>
          {t("memory:labelGameResult").replace("attemts", `${attemts}`)}
        </DialogContentText>
      </DialogContent>
    );
  }, [t, attemts, rating]);

  const resultDialogTitle = React.useMemo(() => {
    return t("memory:titleGameResult");
  }, [t]);

  const okButtonText = React.useMemo(() => {
    return t("memory:labelOK");
  }, [t]);

  return (
    <Grid className="grid-container">
      <Grid container justifyContent="center" direction="column">
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {currentPlayerLabel !== undefined &&
            gameIsRunning &&
            !memoryLoadingIndicatorVisible && (
              <FormLabel style={{ fontSize: "1.5rem" }}>
                {currentPlayerLabel}
              </FormLabel>
            )}
        </Grid>
        <Grid className="card-grid">
          {cards.map((card) => {
            return (
              <MemoryCard
                readonly={choiseOne != null && choiseTwo != null}
                key={card.key}
                card={card}
                isFlipped={
                  choiseOne === card || choiseTwo === card || card.matched
                }
                handleChoice={handleChoice}
              />
            );
          })}
        </Grid>
        <MemoryDialog
          title={resultDialogTitle}
          context={gameResultDialogContext}
          open={resultDialogOpen}
          closeButtonValue={okButtonText}
          handleClose={handleResultDialogClose}
        />
      </Grid>
    </Grid>
  );
};

export default MemoryGameContainer;
