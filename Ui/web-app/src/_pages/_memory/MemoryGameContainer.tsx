import React from "react";
import Grid from "@mui/material/Grid";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import Banner from "../../_components/_text/Banner";
import { useInputButtonProps } from "src/_components/_componentHooks/useInputButtonProps";
import InputButton from "src/_components/_input/InputButton";

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

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      {/* {settings.topic === GameTopicTypeEnum.Alphabet && settings.isRunning && ( */}
      <Grid item xs={12}>
        <Banner
          text="Lass uns alle Buchstaben des Wortes 'Auto' finden!"
          fontSize={24}
          borderRadius={8}
          backgroundColor="lightblue"
          textColor="black"
        />
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          TODO ADD CARDS
        </Grid>
      </Grid>
      {/* )} */}
      <Grid item xs={12}>
        {!settings.isRunning && <InputButton {...startGameButtonProps} />}
      </Grid>
    </Grid>
  );
};

export default MemoryGameContainer;
