import { Grid } from "@mui/material";
import React from "react";
import { UseApi } from "../../_hooks/useApi";
import { IDropdownItem } from "../../_lib/_intefaces/IDropdownItem";
import FormDropdown from "../_input/FormDropdown";
import Typography from "@mui/material/Typography";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "../../_lib/_intefaces/IGameSettingsConfiguration";
import { IGameSettingsBarData } from "../../_lib/_intefaces/IGameSettingsBarData";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";

const controller = `https://localhost:44379/GameSettings/GetSettings`;
interface IProps {
  settings: IGameSettings;
  config: IGameConfiguration;
  gameType: GameTypeEnum;
  marginTop?: number;
  handleIsLoadingChanged: (isLoading: boolean) => void;
  handleSettingsChanged: (settings: IGameSettings) => void;
}

const GenericGameSettingsBar: React.FC<IProps> = (props) => {
  const {
    settings,
    config,
    gameType,
    marginTop,
    handleIsLoadingChanged,
    handleSettingsChanged,
  } = props;

  const [selectedTopic, setSelectedTopic] = React.useState<number>(
    settings.topic ?? config.defaultTopic
  );
  const [selectedLevel, setSelectedLevel] = React.useState<number>(
    settings.level ?? config.defaultLevel
  );
  const [selectedPairsCount, setSelectedPairsCount] = React.useState<number>(
    settings.pairs >= 8 ? settings.pairs : config.defaultFilePairCount
  );

  const dataService = UseApi<IGameSettingsBarData>(
    handleIsLoadingChanged,
    `${controller}?gameType=${gameType}`,
    { method: "GET", mode: "cors" }
  );

  const topicItems = React.useMemo(() => {
    const items: IDropdownItem[] = [];

    dataService?.response?.gameTopics?.forEach((item) => {
      items.push({ key: item.index, value: item.topicName });
    });

    return items;
  }, [dataService.response?.gameTopics]);

  const levelItems = React.useMemo(() => {
    const items: IDropdownItem[] = [];

    dataService?.response?.gameLevelTypeItems?.forEach((item) => {
      items.push({ key: item.key, value: item.value });
    });

    return items;
  }, [dataService.response?.gameLevelTypeItems]);

  const pairItems = React.useMemo(() => {
    const items: IDropdownItem[] = [];

    dataService?.response?.pairCountSelectionItems?.forEach((item) => {
      items.push({ key: item, value: item.toString() });
    });

    return items;
  }, [dataService.response?.pairCountSelectionItems]);

  const handleTopicChanged = React.useCallback(
    (key: number) => {
      setSelectedTopic(key);
      handleSettingsChanged({ ...settings, topic: key });
    },
    [settings, handleSettingsChanged]
  );

  const handleLevelChanged = React.useCallback(
    (key: number) => {
      setSelectedLevel(key);
      handleSettingsChanged({ ...settings, level: key });
    },
    [settings, handleSettingsChanged]
  );

  const handlePairsCountChanged = React.useCallback(
    (key: number) => {
      setSelectedPairsCount(key);
      handleSettingsChanged({ ...settings, pairs: key });
    },
    [settings, handleSettingsChanged]
  );

  if (!dataService.dataIsBound) {
    return null;
  }

  return (
    <Grid
      container
      spacing={1}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "space-around",
        margin: "16px",
        marginTop: marginTop,
        padding: "2px",
        backgroundColor: "lightgray",
        opacity: ".8",
        borderRadius: "16px",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        xl={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "6rem",
        }}
      >
        <Typography variant="h4" justifyContent="center" align="center">
          {dataService.response?.title}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        xl={6}
        style={{
          height: "6rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {config.hasTopic && (
          <FormDropdown
            label="Thema"
            selectedKey={selectedTopic}
            items={topicItems}
            hasDisabledItem={true}
            onChange={handleTopicChanged}
          />
        )}
        {config.hasLevel && (
          <FormDropdown
            label="Level"
            selectedKey={selectedLevel}
            items={levelItems}
            hasDisabledItem={false}
            onChange={handleLevelChanged}
          />
        )}
        {config.hasFilePairs && (
          <FormDropdown
            label="Paare"
            selectedKey={selectedPairsCount}
            items={pairItems}
            hasDisabledItem={false}
            onChange={handlePairsCountChanged}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default GenericGameSettingsBar;
