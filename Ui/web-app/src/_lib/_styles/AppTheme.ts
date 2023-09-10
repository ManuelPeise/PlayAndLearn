import { createTheme } from "@mui/material";

const disabledColor = "#f2f2f2";

// FONTS
const whiteFont = "#ffffff";

// colors
const primaryMain = "#00001a";
const primaryLight = "#f2f2f2";
const primaryDark = "#737373";

const secondareyMain = "#0033cc";
const secondareyLight = "#f2f2f2";
const secondareyDark = "#737373";

const bluePrimary = "#0033cc";
// const blueSecondary = "#1a53ff";
const buttonHover = "#1a53ff";

const primaryGray = "#bfbfbf";
// const secondaryGray = "#a6a6a6";

export const AppTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondareyMain,
      light: secondareyLight,
      dark: secondareyDark,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "@media (min-width: 300px)": {
            padding: ".5rem",
          },
          "@media (min-width: 600px)": {
            padding: ".5rem",
          },
          "@media (min-width: 900px)": {
            padding: ".8rem",
          },
          "@media (min-width: 1200px)": {
            padding: ".8rem",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "20px",
          },
          "@media (max-width: 900px)": {
            fontSize: "24px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "28px",
          },
        },
        h2: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "18px",
          },
          "@media (max-width: 900px)": {
            fontSize: "22px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "26px",
          },
        },
        h3: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "16px",
          },
          "@media (max-width: 900px)": {
            fontSize: "20px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "24px",
          },
        },
        h4: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "14px",
          },
          "@media (max-width: 900px)": {
            fontSize: "18px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "22px",
          },
        },
        h5: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "12px",
          },
          "@media (max-width: 900px)": {
            fontSize: "16px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "20px",
          },
        },
        h6: {
          padding: "10px",
          "@media (max-width: 600px)": {
            fontSize: "10px",
          },
          "@media (max-width: 900px)": {
            fontSize: "14px",
          },
          "@media (max-width: 1200px)": {
            fontSize: "18px",
          },
        },
        caption: {
          padding: "8px",
          "@media (min-width: 300px)": {
            fontSize: "20px",
          },
          "@media (min-width: 600px)": {
            fontSize: "22px",
          },
          "@media (min-width: 900px)": {
            fontSize: "28px",
          },
          "@media (min-width: 1200px)": {
            fontSize: "34px",
          },
        },
        subtitle1: {},
        body1: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
        root: {
          letterSpacing: 1,
          border: "none",
          backgroundColor: "transparent",
          "&:disabled": {
            backgroundColor: disabledColor,
            cursor: "not-allowed",
          },
          "@media (max-width: 600px)": {
            fontSize: "1rem",
            minWidth: "5rem",
          },
          "@media (max-width: 900px)": {
            fontSize: "1rem",
            minWidth: "6rem",
          },
          "@media (min-width: 1200px)": {
            fontSize: "1.5rem",
            minWidth: "8rem",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: primaryGray,
          "&:hover": {
            color: buttonHover,
            cursor: "pointer",
          },
          "&:disabled": {
            color: disabledColor,
            cursor: "not-allowed",
          },
          "&:checked": {
            color: buttonHover,
          },
          "@media (max-width: 600px)": {
            // width: ".5rem",
            // height: ".5rem",
          },
          "@media (max-width: 900px)": {
            // width: ".5rem",
            // height: ".5rem",
          },
          "@media (min-width: 1200px)": {
            // width: ".5rem",
            // height: ".5rem",
          },
        },
        colorSecondary: {
          "&:checked": {
            color: buttonHover,
          },
        },
        colorPrimary: {
          "&:checked": {
            color: buttonHover,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: bluePrimary,
          color: whiteFont,

          "&:hover": {
            backgroundColor: buttonHover,
            color: whiteFont,
            cursor: "pointer",
          },
          "&:disabled": {
            backgroundColor: disabledColor,
          },
          "@media (min-width: 300px)": {
            fontSize: ".5rem",
          },
          "@media (max-width: 600px)": {
            fontSize: ".5rem",
          },
          "@media (max-width: 900px)": {
            fontSize: ".8rem",
          },
          "@media (min-width: 1200px)": {
            fontSize: ".8rem",
          },
        },
        text: {
          backgroundColor: "transparent",
          color: bluePrimary,
          "&:hover": {
            backgroundColor: "transparent",
            color: buttonHover,
            cursor: "pointer",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            root: {},
            "&:disabled": {
              backgroundColor: disabledColor,
              cursor: "not-allowed",
            },
            "&:hover&:not(disabled)": {
              cursor: "pointer",
            },
            "@media (max-width: 600px)": {},
            "@media (max-width: 900px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "1.5rem",
            },
          },
        },
      },
    },
  },
  typography: {},
  breakpoints: {},
});
