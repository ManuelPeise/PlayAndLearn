import React from "react";
import Grid from "@mui/material/Grid";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import { useInputButtonProps } from "src/_components/_componentHooks/useInputButtonProps";
import InputButton from "src/_components/_input/InputButton";
import background from "./_backgrounds/memory_background_abc.jpg";
import { IMemoryCard } from "./_intefaces/IMemoryCard";
import { IMemoryCardRow } from "./_intefaces/IMemoryCardRow";
import { Container } from "@mui/material";

interface IProps {
  settings: IGameSettings;
  isLoading: boolean;
  handleSettingsChanged: (settings: IGameSettings) => void;
  handleIsloadingChanged: (isloading: boolean) => void;
}

const MemoryGameContainer: React.FC<IProps> = (props) => {
  // eslint-disable-next-line
  const { settings, isLoading, handleSettingsChanged, handleIsloadingChanged } =
    props;

  const handleClick = React.useCallback(async () => {
    handleSettingsChanged({ ...settings, isRunning: true });
  }, [settings, handleSettingsChanged]);

  const startGameButtonProps = useInputButtonProps(
    "button",
    "Start",
    isLoading,
    "contained",
    handleClick
  );

  const rows = React.useMemo((): IMemoryCardRow[] => {
    const array: IMemoryCard[] = [];

    for (let i = 0; i < 12; i++) {
      array.push({
        id: i,
        foreGround: background,
        selected: false,
      });
    }

    const rowCount = array.length / 4;
    const rows: IMemoryCardRow[] = [];

    for (let i = 0; i < rowCount; i++) {
      let row: IMemoryCardRow = {
        rowId: `row-${i}`,
        cards: array.filter((x) => x.id >= i && x.id <= i + 3),
      };

      rows.push(row);
    }

    return rows;
  }, []);

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      {settings.isRunning && (
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
                      key={card.id}
                      src={card.foreGround}
                      alt=""
                    />
                  );
                })}
              </Container>
            );
          })}
        </Grid>
      )}
      <Grid item xs={12}>
        {!settings.isRunning && <InputButton {...startGameButtonProps} />}
      </Grid>
    </Grid>
  );
};

export default MemoryGameContainer;
