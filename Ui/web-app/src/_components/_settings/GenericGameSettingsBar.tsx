import { Grid } from "@mui/material";
import React from "react";
import { IGameConfiguration } from "../../_lib/_intefaces/IGameSettingsConfiguration";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useInputDropdownProps } from "../_componentHooks/useInputDropdownProps";
import InputDropdown from "../_input/InputDropDown";
import { useInputButtonProps } from "../_componentHooks/useInputButtonProps";
import InputButton from "../_input/InputButton";
import InputComponentWrapper from "../_input/InputComponentWrapper";
import { IMemoryPageGameData } from "src/_pages/_memory/_intefaces/IMemoryPageGameData";

interface IProps {
  settings: IGameSettings;
  config: IGameConfiguration;
  marginTop?: number;
  targetUrl: string;
  pageData: IMemoryPageGameData;
  handleSettingsChanged: (settings: IGameSettings) => void;
}

const GenericGameSettingsBar: React.FC<IProps> = (props) => {
  const {
    settings,
    config,
    marginTop,
    targetUrl,
    pageData,
    handleSettingsChanged,
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
    (value: any) => {
      handleSettingsChanged({ ...settings, level: value });
    },
    [settings, handleSettingsChanged]
  );

  const topicCallBack = React.useCallback(
    (value: any) => {
      handleSettingsChanged({ ...settings, topic: value });
    },
    [settings, handleSettingsChanged]
  );

  const playerCallBack = React.useCallback(
    (value: any) => {
      handleSettingsChanged({ ...settings, player: value });
    },
    [settings, handleSettingsChanged]
  );

  const topicDropdownProps = useInputDropdownProps(
    false,
    false,
    settings.topic,
    pageData.topicDropdownItems,
    [0],
    topicLabel,
    undefined,
    topicCallBack
  );

  const levelDropdownProps = useInputDropdownProps(
    false,
    false,
    settings.level,
    pageData.levelDropdownItems,
    [0],
    skillLabel,
    undefined,
    levelCallBack
  );

  const playerDropdownProps = useInputDropdownProps(
    false,
    false,
    settings.player,
    pageData.playerDropdownItems,
    [0],
    playerLabel,
    undefined,
    playerCallBack
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
        {config.hasTopicSelection && (
          <InputComponentWrapper
            spacing={1}
            children={<InputDropdown {...topicDropdownProps} />}
          />
        )}
        {config.hasLevelSelection && (
          <InputComponentWrapper
            spacing={1}
            children={<InputDropdown {...levelDropdownProps} />}
          />
        )}

        {config.hasPlayerSelection && (
          <InputComponentWrapper
            spacing={1}
            children={<InputDropdown {...playerDropdownProps} />}
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
