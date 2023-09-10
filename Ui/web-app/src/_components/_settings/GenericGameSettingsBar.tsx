import { Grid } from "@mui/material";
import React from "react";
import { UseApi } from "../../_hooks/useApi";
import { IDropdownItem } from "../../_lib/_intefaces/IDropdownItem";
import { GameTypeEnum } from "../../_lib/_enums/GameTypeEnum";
import { IGameConfiguration } from "../../_lib/_intefaces/IGameSettingsConfiguration";
import { IGameSettingsBarData } from "../../_lib/_intefaces/IGameSettingsBarData";
import { IGameSettings } from "../../_lib/_intefaces/IGameSettings";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useInputDropdownProps } from "../_componentHooks/useInputDropdownProps";
import InputDropdown from "../_input/InputDropDown";
import { useInputButtonProps } from "../_componentHooks/useInputButtonProps";
import InputButton from "../_input/InputButton";
import InputComponentWrapper from "../_input/InputComponentWrapper";

const controller = `${process.env.REACT_APP_GAME_SETTINGS_CONTROLLER}GetSettings`;

interface IProps {
  settings: IGameSettings;
  config: IGameConfiguration;
  gameType: GameTypeEnum;
  marginTop?: number;
  targetUrl: string;
  handleIsLoadingChanged: (isLoading: boolean) => void;
  handleSettingsChanged: (settings: IGameSettings) => void;
}

const GenericGameSettingsBar: React.FC<IProps> = (props) => {
  const {
    settings,
    config,
    gameType,
    marginTop,
    targetUrl,
    handleIsLoadingChanged,
    handleSettingsChanged,
  } = props;

  const { t } = useTranslation();

  const dataService = UseApi<IGameSettingsBarData>(
    handleIsLoadingChanged,
    `${controller}`,
    `?gameType=${gameType}`,
    { method: "GET", mode: "cors" }
  );

  const topicItems = React.useMemo(() => {
    const items: IDropdownItem[] = [];

    dataService?.response?.gameTopics?.forEach((item) => {
      items.push({ key: item.key, value: item.value });
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

  const topic = React.useMemo(() => {
    return t("memory:topic");
  }, [t]);

  const skill = React.useMemo(() => {
    return t("memory:skill");
  }, [t]);

  const addGame = React.useMemo(() => {
    return t("memory:addGame");
  }, [t]);

  const levelCallBack = React.useCallback(
    (value: any) => {
      console.log(value);
      handleSettingsChanged({ ...settings, level: value });
    },
    [settings, handleSettingsChanged]
  );

  const topicCallBack = React.useCallback(
    (value: any) => {
      handleSettingsChanged({ ...settings, topicId: value });
    },
    [settings, handleSettingsChanged]
  );

  const topicDropdownProps = useInputDropdownProps(
    false,
    false,
    settings.topicId,
    topicItems,
    topic,
    undefined,
    topicCallBack
  );

  const levelDropdownProps = useInputDropdownProps(
    false,
    false,
    settings.topicId,
    levelItems,
    skill,
    undefined,
    levelCallBack
  );

  const buttonProps = useInputButtonProps(
    "button",
    addGame,
    false,
    "text",
    () => {}
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
        {config.hasTopic && (
          <InputComponentWrapper
            spacing={1}
            children={<InputDropdown {...topicDropdownProps} />}
          />
        )}
        {config.hasLevel && (
          <InputComponentWrapper
            spacing={1}
            children={<InputDropdown {...levelDropdownProps} />}
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
