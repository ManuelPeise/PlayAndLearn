import { Grid } from "@mui/material";
import React from "react";
import { IMemoryCard } from "../_interfaces/IMemoryCard";
import MemoryCard from "./MemoryCard";

interface IProps {
  cards: IMemoryCard[];
  choiceOne: IMemoryCard | null;
  choiceTwo: IMemoryCard | null;
  isAi: boolean;
  handleChoice: (card: IMemoryCard) => void;
}

const MemoryCardGrid: React.FC<IProps> = (props) => {
  const { cards, choiceOne, choiceTwo, isAi, handleChoice } = props;

  return (
    <Grid className="card-grid-container">
      <Grid className="card-grid">
        {cards.map((card) => {
          return (
            <MemoryCard
              readonly={(choiceOne != null && choiceTwo != null) || isAi}
              key={card.fieldId}
              card={card}
              isFlipped={
                choiceOne === card || choiceTwo === card || card.matched
              }
              handleChoice={handleChoice}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MemoryCardGrid;
