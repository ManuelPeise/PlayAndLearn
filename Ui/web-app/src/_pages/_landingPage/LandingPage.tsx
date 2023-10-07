import React from "react";
import PageLayout from "../PageLayout";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("common:titleLandingPage");
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

export default LandingPage;
