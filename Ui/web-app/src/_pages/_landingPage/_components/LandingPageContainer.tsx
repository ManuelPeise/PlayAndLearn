import { Grid } from "@mui/material";
import React from "react";
import appLogo from "../_images/appLogo.png";

const LandingPageContainer: React.FC = () => {
  return (
    <Grid className="landing-page-container">
      <img src={appLogo} alt="appLogo" />
    </Grid>
  );
};

export default LandingPageContainer;
