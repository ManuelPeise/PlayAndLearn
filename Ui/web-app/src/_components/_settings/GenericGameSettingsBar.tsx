import { Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import InputDropdown from "../_input/InputDropDown";
import { useInputButtonProps } from "../_componentHooks/useInputButtonProps";
import InputButton from "../_input/InputButton";
import InputComponentWrapper from "../_input/InputComponentWrapper";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";

interface IProps {
  marginTop?: number;
  targetUrl: string;
  selectedTopic?: number;
  hasTopicDropDown?: boolean;
  hasLevelDropDown?: boolean;
  hasPlayerDropDown?: boolean;
  topics?: IKeyValueItem[];
  selectedLevel?: number;
  levels?: IKeyValueItem[];
  players: IKeyValueItem[];
  selectedPlayer: number;
  gameConfiguration: IGameConfiguration;
  readonly: boolean;
  handleGameConfigurationChanged: (
    gameConfiguration: IGameConfiguration
  ) => Promise<void>;
}

const GenericGameSettingsBar: React.FC<IProps> = (props) => {
  const {
    marginTop,
    targetUrl,
    readonly,
    hasLevelDropDown,
    hasPlayerDropDown,
    hasTopicDropDown,
    topics,
    selectedTopic,
    levels,
    selectedLevel,
    players,
    selectedPlayer,
    gameConfiguration,
    handleGameConfigurationChanged,
  } = props;

  const { t } = useTranslation();

  const topicLabel = React.useMemo(() => {
    return t("memory:topic");
  }, [t]);

  const skillLabel = React.useMemo(() => {
    return t("memory:skill");
  }, [t]);

  const playerLabel = React.useMemo(() => {
    return t("memory:player");
  }, [t]);

  const addGame = React.useMemo(() => {
    return t("memory:addGame");
  }, [t]);

  const levelCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      const gameConfig: IGameConfiguration = {
        ...gameConfiguration,
        selectedLevel: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [gameConfiguration, handleGameConfigurationChanged]
  );

  const topicCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      const gameConfig: IGameConfiguration = {
        ...gameConfiguration,
        selectedTopic: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [gameConfiguration, handleGameConfigurationChanged]
  );

  const playerCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      const gameConfig: IGameConfiguration = {
        ...gameConfiguration,
        selectedPlayer: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [gameConfiguration, handleGameConfigurationChanged]
  );

  const topicItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    topics?.forEach((topic) => {
      items.push({ key: topic.key, value: t(`memory:${topic.value}`) });
    });

    return items;
  }, [topics, t]);

  const levelItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    levels?.forEach((level) => {
      items.push({ key: level.key, value: t(`memory:${level.value}`) });
    });

    return items;
  }, [levels, t]);

  const playerItems = React.useMemo((): IKeyValueItem[] => {
    const items: IKeyValueItem[] = [];
    players?.forEach((player) => {
      items.push({ key: player.key, value: t(`memory:${player.value}`) });
    });

    return items;
  }, [players, t]);

  const buttonProps = useInputButtonProps(
    "button",
    addGame,
    readonly,
    "outlined",
    () => {}
  );

  return (
    <Grid
      container
      spacing={0}
      className="game-settings-bar"
      style={{
        marginTop: marginTop,
      }}
    >
      <Grid item xs={12} className="game-settings-bar-items-container">
        {hasTopicDropDown && (
          <InputComponentWrapper
            className="game-settings-bar-item-wrapper"
            children={
              <InputDropdown
                readOnly={readonly}
                toolTip={topicLabel}
                selectedKey={selectedTopic ?? 0}
                items={topicItems}
                disabledItems={[0]}
                handleChange={topicCallBack}
              />
            }
          />
        )}
        {hasLevelDropDown && (
          <InputComponentWrapper
            className="game-settings-bar-item-wrapper"
            children={
              <InputDropdown
                readOnly={readonly}
                toolTip={skillLabel}
                selectedKey={selectedLevel ?? 0}
                items={levelItems}
                disabledItems={[0]}
                handleChange={levelCallBack}
              />
            }
          />
        )}
        {hasPlayerDropDown && (
          <InputComponentWrapper
            className="game-settings-bar-item-wrapper"
            children={
              <InputDropdown
                readOnly={readonly}
                toolTip={playerLabel}
                selectedKey={selectedPlayer}
                items={playerItems}
                disabledItems={[0]}
                handleChange={playerCallBack}
              />
            }
          />
        )}
        <InputComponentWrapper
          className="game-settings-bar-item-wrapper"
          children={
            <NavLink
              className="settings-bar-nav-link"
              style={{ textDecoration: "none" }}
              to={targetUrl}
            >
              <InputButton {...buttonProps} />
            </NavLink>
          }
        />
      </Grid>
    </Grid>
  );
};

export default GenericGameSettingsBar;
