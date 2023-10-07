import React from "react";
import PageLayout from "../PageLayout";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

const TicTacToeGame: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("ticTacToe:pageTitle");
  }, [t]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid style={{ display: "flex", justifyContent: "center" }}></Grid>
      }
    />
  );
};

export default TicTacToeGame;
