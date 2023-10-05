import React from "react";
import PageLayout from "../PageLayout";
import { Grid } from "@mui/material";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";
import MemoryPlayGround from "./_components/MemoryPlayGround";
import { IMemorySettings } from "./_interfaces/IMemorySettings";
import { useTranslation } from "react-i18next";

const MemoryGame: React.FC = () => {
  const [settings, setSettings] = React.useState<IMemorySettings>({
    selectedTopic: 0,
    selectedLevel: 0,
    selectedPlayerMode: 0,
    players: [],
    isRunning: false,
    cards: [],
  });

  const { t } = useTranslation();

  const handleSettingsChanged = React.useCallback(
    (state: Partial<IMemorySettings>) => {
      setSettings({ ...settings, ...state });
    },
    [settings]
  );

  const [isLoading, setIsloading] = React.useState<boolean>(false);

  const handleIsLoadingChanged = React.useCallback((isLoading: boolean) => {
    setIsloading(isLoading);
  }, []);

  const pageTitle = React.useMemo(() => {
    return t(`memory:pageTitle`);
  }, [t]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Loadingindicator isLoading={isLoading} />
          <MemoryPlayGround
            settings={settings}
            handleSettingsChanged={handleSettingsChanged}
            handleIsLoadingChanged={handleIsLoadingChanged}
          />
        </Grid>
      }
    />
  );
};

export default MemoryGame;
