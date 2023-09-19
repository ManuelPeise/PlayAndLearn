import { Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import InputDropdown from "../_input/InputDropDown";
import { useInputButtonProps } from "../_componentHooks/useInputButtonProps";
import InputButton from "../_input/InputButton";
import InputComponentWrapper from "../_input/InputComponentWrapper";
import { IMemoryGameContextData } from "src/_pages/_memory/_intefaces/IMemoryGameContext";
import { IGameConfiguration } from "src/_lib/_intefaces/IGameConfiguration";

interface IProps {
  marginTop?: number;
  targetUrl: string;
  contextData: IMemoryGameContextData;
  handleGameConfigurationChanged: (
    gameConfiguration: IGameConfiguration
  ) => Promise<void>;
}

const GenericGameSettingsBar: React.FC<IProps> = (props) => {
  const { marginTop, targetUrl, contextData, handleGameConfigurationChanged } =
    props;

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
        ...contextData.gameConfiguration,
        selectedLevel: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [contextData, handleGameConfigurationChanged]
  );

  const topicCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      console.log("change topic...");
      const gameConfig: IGameConfiguration = {
        ...contextData.gameConfiguration,
        selectedTopic: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [contextData, handleGameConfigurationChanged]
  );

  const playerCallBack = React.useCallback(
    async (e: SelectChangeEvent) => {
      const gameConfig: IGameConfiguration = {
        ...contextData.gameConfiguration,
        selectedPlayer: parseInt(e.target.value),
      };

      await handleGameConfigurationChanged(gameConfig);
    },
    [contextData, handleGameConfigurationChanged]
  );

  const buttonProps = useInputButtonProps(
    "button",
    addGame,
    false,
    "text",
    () => {}
  );

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
        backgroundColor: "lightblue",
        opacity: ".8",
        borderRadius: "8px",
      }}
    >
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
        {contextData.gameConfiguration.hasTopicSelection && (
          <InputComponentWrapper
            spacing={1}
            children={
              <InputDropdown
                toolTip={topicLabel}
                selectedKey={contextData.gameConfiguration.selectedTopic}
                items={contextData.topicItems}
                disabledItems={[0]}
                handleChange={topicCallBack}
              />
            }
          />
        )}
        {contextData.gameConfiguration.hasLevelSelection && (
          <InputComponentWrapper
            spacing={1}
            children={
              <InputDropdown
                toolTip={skillLabel}
                selectedKey={contextData.gameConfiguration.selectedLevel}
                items={contextData.levelItems}
                disabledItems={[0]}
                handleChange={levelCallBack}
              />
            }
          />
        )}

        {contextData.gameConfiguration.hasPlayerSelection && (
          <InputComponentWrapper
            spacing={1}
            children={
              <InputDropdown
                toolTip={playerLabel}
                selectedKey={contextData.gameConfiguration.selectedPlayer}
                items={contextData.playerItems}
                disabledItems={[0]}
                handleChange={playerCallBack}
              />
            }
          />
        )}
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
        <NavLink style={{ textDecoration: "none" }} to={targetUrl}>
          <InputButton {...buttonProps} />
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default GenericGameSettingsBar;
