import { Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import InputComponentWrapper from "src/_components/_input/InputComponentWrapper";
import InputDropdown from "src/_components/_input/InputDropDown";
import { IMemorySettings } from "../_interfaces/IMemorySettings";
import { UseApi } from "src/_hooks/useApi";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import "../_style/memorySettingsBar.css";
import InputButton from "src/_components/_input/InputButton";
import PlayerConfigurationDialog from "./PlayerConfigurationDialog";
import { IMemoryPlayer } from "../_interfaces/IMemoryPlayer";

const memoryController = `${process.env.REACT_APP_API_URL}Memory/`;

interface ISettingsBarData {
  topicItems: IKeyValueItem[];
  levelItems: IKeyValueItem[];
  playerItems: IKeyValueItem[];
}

interface IProps {
  settings: IMemorySettings;
  handleIsLoading: (isLoading: boolean) => void;
  handleSettingsChanged: (settings: Partial<IMemorySettings>) => void;
  handleStartGame: () => Promise<void>;
}

const MemorySettingsBar: React.FC<IProps> = (props) => {
  const { settings, handleIsLoading, handleSettingsChanged, handleStartGame } =
    props;
  const [playerDialogOpen, setPlayerDialogOpen] =
    React.useState<boolean>(false);
  const { t } = useTranslation();

  const { topicLabel, skillLabel, playerLabel, startGame, playerConfig } = {
    topicLabel: t("common:labelTopic"),
    skillLabel: t("common:labelSkill"),
    playerLabel: t("common:labelPlayer"),
    startGame: t("common:labelStartGame"),
    playerConfig: t("common:labelPlayerConfig"),
  };

  const settingsApi = UseApi<ISettingsBarData>(
    handleIsLoading,
    `${memoryController}GetSettingsBarData`,
    "",
    {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": `application/json`,
      },
    }
  );

  const topicItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    settingsApi.response?.topicItems?.forEach((topic) => {
      items.push({ key: topic.key, value: t(`common:${topic.value}`) });
    });

    return items;
  }, [settingsApi.response?.topicItems, t]);

  const playerItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    settingsApi.response?.playerItems?.forEach((player) => {
      items.push({ key: player.key, value: t(`common:${player.value}`) });
    });

    return items;
  }, [settingsApi.response?.playerItems, t]);

  const levelItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    settingsApi.response?.levelItems?.forEach((level) => {
      items.push({ key: level.key, value: t(`common:${level.value}`) });
    });

    return items;
  }, [settingsApi.response?.levelItems, t]);

  const handlePlayerDialogOpen = React.useCallback(() => {
    setPlayerDialogOpen(true);
  }, []);

  const handlePlayerDialogClose = React.useCallback(() => {
    setPlayerDialogOpen(false);
  }, []);

  const handleSavePlayerConfiguration = React.useCallback(
    (players: IMemoryPlayer[]) => {
      handleSettingsChanged({ players: players });
      setPlayerDialogOpen(false);
    },
    [handleSettingsChanged]
  );

  const topicCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      handleSettingsChanged({ selectedTopic: parseInt(e.target.value) });
    },
    [handleSettingsChanged]
  );

  const levelCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      handleSettingsChanged({ selectedLevel: parseInt(e.target.value) });
    },
    [handleSettingsChanged]
  );

  const playerCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      const playerModeId = parseInt(e.target.value);

      const players: IMemoryPlayer[] = [];

      if (playerModeId === 1) {
        players.push({ playerId: 0, name: "", isAiPlayer: false, cards: [] });
      }

      if (playerModeId === 2) {
        players.push({ playerId: 0, name: "", isAiPlayer: false, cards: [] });
        players.push({ playerId: 1, name: "CPU", isAiPlayer: true, cards: [] });
      }

      if (playerModeId === 3) {
        players.push({ playerId: 0, name: "", isAiPlayer: false, cards: [] });
        players.push({ playerId: 1, name: "", isAiPlayer: false, cards: [] });
      }

      handleSettingsChanged({
        selectedPlayerMode: playerModeId,
        players: players,
      });
    },
    [handleSettingsChanged]
  );

  const playerConfigDisabled = React.useMemo(() => {
    return settings.selectedTopic === 0 || settings.selectedPlayerMode === 0;
  }, [settings]);

  const startGameDisabled = React.useMemo(() => {
    return playerConfigDisabled || settings.selectedLevel === 0;
  }, [playerConfigDisabled, settings.selectedLevel]);

  const levelSelectionDisabled = React.useMemo(() => {
    if (settings.selectedPlayerMode === 1) {
      return settings.players[0].name.length === 0;
    }

    if (settings.selectedPlayerMode === 2) {
      return settings.players[0].name.length === 0;
    }

    if (settings.selectedPlayerMode === 3) {
      return (
        settings.players[0].name.length === 0 ||
        settings.players[1].name.length === 0
      );
    }

    return true;
  }, [settings.players, settings.selectedPlayerMode]);

  const playerDropdownWidth = React.useMemo(() => {
    const remPerChar = 0.6;

    let width = 0;

    playerItems.forEach((item) => {
      const value = t(`memory:${item.value}`);
      const currentWidth = value.length * remPerChar;
      if (width < currentWidth) {
        width = currentWidth;
      }
    });

    return width;
  }, [t, playerItems]);

  const topicDropdownWidth = React.useMemo(() => {
    const remPerChar = 0.6;

    let width = 0;

    topicItems.forEach((item) => {
      const value = t(`memory:${item.value}`);
      const currentWidth = value.length * remPerChar;
      if (width < currentWidth) {
        width = currentWidth;
      }
    });

    return width;
  }, [t, topicItems]);

  const levelDropdownWidth = React.useMemo(() => {
    const remPerChar = 0.6;

    let width = 0;

    levelItems.forEach((item) => {
      const value = t(`memory:${item.value}`);
      const currentWidth = value.length * remPerChar;
      if (width < currentWidth) {
        width = currentWidth;
      }
    });

    return width;
  }, [t, levelItems]);

  if (!settingsApi.dataIsBound) {
    return null;
  }

  return (
    <Grid className="memory-settings-bar-container">
      {/* topic selection */}
      <Grid className="settings-bar-item">
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper"
          children={
            <InputDropdown
              minWidth={topicDropdownWidth}
              selectedKey={settings.selectedTopic}
              toolTip={topicLabel}
              disabledItems={[0]}
              items={topicItems}
              handleChange={topicCallBack}
            />
          }
        />
      </Grid>
      {/* player selection */}
      <Grid className="settings-bar-item">
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper"
          children={
            <InputDropdown
              minWidth={playerDropdownWidth}
              selectedKey={settings.selectedPlayerMode}
              toolTip={playerLabel}
              disabledItems={[0]}
              items={playerItems}
              handleChange={playerCallBack}
            />
          }
        />
      </Grid>
      <Grid className="settings-bar-item">
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper settings-bar-button"
          children={
            <InputButton
              buttonType="button"
              text={playerConfig}
              variant="outlined"
              readonly={playerConfigDisabled}
              handleClick={handlePlayerDialogOpen}
            />
          }
        />
      </Grid>
      {/* level selection */}
      <Grid className="settings-bar-item">
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper"
          children={
            <InputDropdown
              minWidth={levelDropdownWidth}
              readOnly={levelSelectionDisabled}
              selectedKey={settings.selectedLevel}
              toolTip={skillLabel}
              disabledItems={[0]}
              items={levelItems}
              handleChange={levelCallBack}
            />
          }
        />
      </Grid>
      <Grid className="settings-bar-item">
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper settings-bar-button"
          children={
            <InputButton
              buttonType="button"
              text={startGame}
              variant="outlined"
              readonly={startGameDisabled}
              handleClick={handleStartGame}
            />
          }
        />
      </Grid>
      {/* {settings.players.length && ( */}
      <PlayerConfigurationDialog
        open={playerDialogOpen}
        settings={settings}
        handleClose={handlePlayerDialogClose}
        handleSavePlayerConfiguration={handleSavePlayerConfiguration}
      />
      {/* )} */}
    </Grid>
  );
};

export default MemorySettingsBar;
