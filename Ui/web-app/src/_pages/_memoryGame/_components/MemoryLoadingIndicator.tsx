import { FormLabel, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  value: string;
  marginTop: number;
}

const MemoryLoadingIndicator: React.FC<IProps> = (props) => {
  const { value, marginTop } = props;

  const { t } = useTranslation();

  const loadingIndicatorText = React.useMemo(() => {
    if (value !== "") {
      return t(`memory:${value}`);
    }

    return "";
  }, [t, value]);

  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: `${marginTop}rem`,
        opacity: ".5",
        padding: "1rem",
      }}
      container
    >
      <FormLabel style={{ fontSize: "2rem" }}>{loadingIndicatorText}</FormLabel>
    </Grid>
  );
};

export default MemoryLoadingIndicator;
