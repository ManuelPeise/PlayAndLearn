import React from "react";
import Grid from "@mui/material/Grid";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import { GameTopicTypeEnum } from "../../_lib/_enums/GameTopicTypeEnum";
import Banner from "../../_components/_text/Banner";
import FormButton from "../../_components/_input/FormButton";
import { UseApi } from "../../_hooks/useApi";
import { IWord } from "./_intefaces/IWord";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";

interface IProps {
  settings: IGameSettings;
  isLoading: boolean;
  handleSettingsChanged: (settings: IGameSettings) => void;
  handleIsloadingChanged: (isloading: boolean) => void;
}

const controller = `https://localhost:44379/Memory/GetWordList`;

const MemoryGameContainer: React.FC<IProps> = (props) => {
  const { settings, isLoading, handleSettingsChanged, handleIsloadingChanged } =
    props;

  const wordDataService = UseApi<IWord[]>(handleIsloadingChanged);

  React.useEffect(() => {
    if (settings.topic === GameTopicTypeEnum.Alphabet) {
      const getWords = async () => {
        await wordDataService.fetchData(
          `${controller}?gameType=${GameTypeEnum.Memory}&levelType=${settings.level}`,
          { method: "GET", mode: "cors" }
        );
      };

      void getWords();
    }
  }, [settings.topic, settings.level]);

  const handleClick = React.useCallback(async () => {
    handleSettingsChanged({ ...settings, isRunning: true });
  }, [settings, handleSettingsChanged]);

  if (
    settings.topic === GameTopicTypeEnum.Alphabet &&
    !wordDataService.dataIsBound
  ) {
    return null;
  }

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      {settings.topic === GameTopicTypeEnum.Alphabet && settings.isRunning && (
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
      )}
      <Grid item xs={12}>
        {!settings.isRunning && (
          <FormButton
            text="Spielen"
            variant="contained"
            fontsize={18}
            xs={12}
            disabled={isLoading}
            handleClick={handleClick}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MemoryGameContainer;
