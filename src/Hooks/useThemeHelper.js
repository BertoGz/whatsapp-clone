import { theme } from "../Theme";
import { darken, lighten } from "@mui/material";
export const themeHelper = {
  contrastText: (bgColor) => {
    return theme.palette.getContrastText(theme.palette.secondary.main);
  },
  lightenColor: (color, ratio) => {
    return lighten(color, ratio);
  },
  darkenColor: (color, ratio) => {
    return darken(color, ratio);
  },
};
