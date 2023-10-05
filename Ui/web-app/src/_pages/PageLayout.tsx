import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import React from "react";
import PageHeader from "src/_components/_appbars/PageHeaderBar";
import { AppTheme } from "src/_lib/_styles/AppTheme";

interface IProps {
  pageBody: JSX.Element;
  pageTitle: string;
}

const PageLayout: React.FC<IProps> = (props) => {
  const { pageBody, pageTitle } = props;

  return (
    <React.Fragment>
      <ThemeProvider theme={AppTheme}>
        <PageHeader pageTitle={pageTitle} />
        <Grid container style={{ width: "100vw" }}>
          {pageBody}
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default PageLayout;
