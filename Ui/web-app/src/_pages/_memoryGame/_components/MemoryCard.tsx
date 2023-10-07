import React from "react";
import { getFileSrcFromBase64 } from "src/_lib/_utils/GameConfigurationHandler";
import { IMemoryCard } from "../_interfaces/IMemoryCard";
import { Grid } from "@mui/material";
import background from "../_backgrounds/memoryBackground.jpg";

interface IProps {
  card: IMemoryCard;
  isFlipped: boolean;
  readonly: boolean;
  handleChoice: (card: IMemoryCard) => void;
}

const MemoryCard: React.FC<IProps> = (props) => {
  const { card, isFlipped, readonly, handleChoice } = props;

  const frontImgSource = React.useMemo(() => {
    return getFileSrcFromBase64(card.foreground);
  }, [card.foreground]);

  const onChoice = React.useCallback((): void => {
    handleChoice(card);
  }, [card, handleChoice]);

  return (
    <Grid className={readonly ? "card card-disabled" : "card"}>
      <Grid className={isFlipped ? "flipped" : ""}>
        <img className="front" src={frontImgSource} alt="card front" />
        <img
          className="back"
          src={background}
          alt="card back"
          onClick={onChoice}
        />
      </Grid>
    </Grid>
  );
};

export default MemoryCard;
