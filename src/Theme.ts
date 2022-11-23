import { createTheme } from "@mui/material";
import { darken, lighten } from "@mui/material";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#bcaaa4",
      light: "#efdcd5",
      dark: "#8c7b75",
      contrastText: "rgba(0,0,0,.5)",
    },
    secondary: {
      main: "#2c3f44",
      light: "#566a6f",
      dark: "#17343c",
      contrastText: "rgba(0,0,0,.5)",
    },
  },
});

export const highlightItemColor = (isSelected: boolean) => {

};
export const styleHelpers = {
  highlightItemColor,
};

type colorTypes = "secondaryMain" | "secondaryLight" | "secondaryDark";
function getPalletColor(color: colorTypes) {
  let palletColor = null as any;
  switch (color) {
    case "secondaryDark":
      palletColor = theme.palette.secondary.dark;
      break;
    case "secondaryMain":
      palletColor = theme.palette.secondary.main;
      break;
    case "secondaryLight":
      palletColor = theme.palette.secondary.light;
      break;
    default:
      palletColor = theme.palette.secondary.light;
  }

  return palletColor;
}
export const colorHelper = {
  contrastText: (color: colorTypes) => {
    const palletColor = getPalletColor(color);
    return theme.palette.getContrastText(palletColor);
  },
  lightenColor: (color: colorTypes, ratio: number) => {
    const palletColor = getPalletColor(color);

    return lighten(palletColor, ratio);
  },
  darkenColor: (color: colorTypes, ratio: number) => {
    const palletColor = getPalletColor(color);

    return darken(palletColor, ratio);
  },
};
