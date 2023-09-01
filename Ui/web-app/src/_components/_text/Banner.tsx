import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface IProps {
  text: string;
  fontSize: number;
  backgroundColor: string;
  borderRadius?: number;
  textColor: string;
}

const Banner: React.FC<IProps> = (props) => {
  const { text, fontSize, backgroundColor, borderRadius, textColor } = props;

  return (
    <Grid
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "16px",
        padding: "8px",
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <Typography style={{ fontSize: `${fontSize}px`, color: textColor }}>
        {text}
      </Typography>
    </Grid>
  );
};

export default Banner;
