import React from "react";
import Grid from "@mui/material/Grid";
import { IMemoryCard } from "./_intefaces/IMemoryCard";
import { IMemoryCardRow } from "./_intefaces/IMemoryCardRow";
import { Container } from "@mui/material";

interface IProps {
  isLoading: boolean;
  cards: IMemoryCard[];
}

const MemoryGameContainer: React.FC<IProps> = (props) => {
  // eslint-disable-next-line
  const { isLoading, cards } = props;

  const rows = React.useMemo((): IMemoryCardRow[] => {
    const rowCount = cards.length / 4;
    const rows: IMemoryCardRow[] = [];
    let index = 0;
    for (let rowId = 0; rowId < rowCount; rowId++) {
      let row: IMemoryCardRow = { rowId: `row-${rowId}`, cards: [] };
      for (let cardId = 0; cardId < 4; cardId++) {
        row.cards.push(cards[index]);
        index++;
      }
      // let row: IMemoryCardRow = {
      //   rowId: `row-${i}`,
      //   cards: cards.filter((x) => x.id >= i && x.id <= i + 3),
      // };

      rows.push(row);
    }

    return rows;
  }, [cards]);

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      {/* {settings.isRunning && ( */}
      <Grid container style={{ display: "flex", justifyItems: "center" }}>
        {rows.map((row) => {
          return (
            <Container
              className="memory-card-container"
              key={row.rowId}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {row.cards.map((card) => {
                return (
                  <img
                    id={card.id.toString()}
                    className="memory-card"
                    key={card.key}
                    src={`data:image/jpeg;base64,${card.foreground}`}
                    alt=""
                  />
                );
              })}
            </Container>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MemoryGameContainer;
