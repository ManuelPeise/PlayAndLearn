import React from "react";
import PageLayout from "../PageLayout";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import LandingPageContainer from "./_components/LandingPageContainer";
import "./_style/landingPage.css";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("common:titleLandingPage");
  }, [t]);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid className="landing-page">
          <LandingPageContainer />
        </Grid>
      }
    />
  );
};

export default LandingPage;
