import React from "react";
import { ThemeContext } from "@emotion/core";
import { useContext } from "react";

type Colors = {
  red_50: string;
  red_100: string;
  red_200: string;
  red_300: string;
  red_400: string;
  red_500: string;
  red_600: string;
  red_700: string;
  red_800: string;
  red_900: string;
  red_a100: string;
  red_a200: string;
  red_a400: string;
  red_a700: string;
  pink_50: string;
  pink_100: string;
  pink_200: string;
  pink_300: string;
  pink_400: string;
  pink_500: string;
  pink_600: string;
  pink_700: string;
  pink_800: string;
  pink_900: string;
  pink_a100: string;
  pink_a200: string;
  pink_a400: string;
  pink_a700: string;
  purple_50: string;
  purple_100: string;
  purple_200: string;
  purple_300: string;
  purple_400: string;
  purple_500: string;
  purple_600: string;
  purple_700: string;
  purple_800: string;
  purple_900: string;
  purple_a100: string;
  purple_a200: string;
  purple_a400: string;
  purple_a700: string;
  deep_purple_50: string;
  deep_purple_100: string;
  deep_purple_200: string;
  deep_purple_300: string;
  deep_purple_400: string;
  deep_purple_500: string;
  deep_purple_600: string;
  deep_purple_700: string;
  deep_purple_800: string;
  deep_purple_900: string;
  deep_purple_a100: string;
  deep_purple_a200: string;
  deep_purple_a400: string;
  deep_purple_a700: string;
  indigo_50: string;
  indigo_100: string;
  indigo_200: string;
  indigo_300: string;
  indigo_400: string;
  indigo_500: string;
  indigo_600: string;
  indigo_700: string;
  indigo_800: string;
  indigo_900: string;
  indigo_a100: string;
  indigo_a200: string;
  indigo_a400: string;
  indigo_a700: string;
  blue_50: string;
  blue_100: string;
  blue_200: string;
  blue_300: string;
  blue_400: string;
  blue_500: string;
  blue_600: string;
  blue_700: string;
  blue_800: string;
  blue_900: string;
  blue_a100: string;
  blue_a200: string;
  blue_a400: string;
  blue_a700: string;
  light_blue_50: string;
  light_blue_100: string;
  light_blue_200: string;
  light_blue_300: string;
  light_blue_400: string;
  light_blue_500: string;
  light_blue_600: string;
  light_blue_700: string;
  light_blue_800: string;
  light_blue_900: string;
  light_blue_a100: string;
  light_blue_a200: string;
  light_blue_a400: string;
  light_blue_a700: string;
  cyan_50: string;
  cyan_100: string;
  cyan_200: string;
  cyan_300: string;
  cyan_400: string;
  cyan_500: string;
  cyan_600: string;
  cyan_700: string;
  cyan_800: string;
  cyan_900: string;
  cyan_a100: string;
  cyan_a200: string;
  cyan_a400: string;
  cyan_a700: string;
  teal_50: string;
  teal_100: string;
  teal_200: string;
  teal_300: string;
  teal_400: string;
  teal_500: string;
  teal_600: string;
  teal_700: string;
  teal_800: string;
  teal_900: string;
  teal_a100: string;
  teal_a200: string;
  teal_a400: string;
  teal_a700: string;
  green_50: string;
  green_100: string;
  green_200: string;
  green_300: string;
  green_400: string;
  green_500: string;
  green_600: string;
  green_700: string;
  green_800: string;
  green_900: string;
  green_a100: string;
  green_a200: string;
  green_a400: string;
  green_a700: string;
  light_green_50: string;
  light_green_100: string;
  light_green_200: string;
  light_green_300: string;
  light_green_400: string;
  light_green_500: string;
  light_green_600: string;
  light_green_700: string;
  light_green_800: string;
  light_green_900: string;
  light_green_a100: string;
  light_green_a200: string;
  light_green_a400: string;
  light_green_a700: string;
  lime_50: string;
  lime_100: string;
  lime_200: string;
  lime_300: string;
  lime_400: string;
  lime_500: string;
  lime_600: string;
  lime_700: string;
  lime_800: string;
  lime_900: string;
  lime_a100: string;
  lime_a200: string;
  lime_a400: string;
  lime_a700: string;
  yellow_50: string;
  yellow_100: string;
  yellow_200: string;
  yellow_300: string;
  yellow_400: string;
  yellow_500: string;
  yellow_600: string;
  yellow_700: string;
  yellow_800: string;
  yellow_900: string;
  yellow_a100: string;
  yellow_a200: string;
  yellow_a400: string;
  yellow_a700: string;
  amber_50: string;
  amber_100: string;
  amber_200: string;
  amber_300: string;
  amber_400: string;
  amber_500: string;
  amber_600: string;
  amber_700: string;
  amber_800: string;
  amber_900: string;
  amber_a100: string;
  amber_a200: string;
  amber_a400: string;
  amber_a700: string;
  orange_50: string;
  orange_100: string;
  orange_200: string;
  orange_300: string;
  orange_400: string;
  orange_500: string;
  orange_600: string;
  orange_700: string;
  orange_800: string;
  orange_900: string;
  orange_a100: string;
  orange_a200: string;
  orange_a400: string;
  orange_a700: string;
  deep_orange_50: string;
  deep_orange_100: string;
  deep_orange_200: string;
  deep_orange_300: string;
  deep_orange_400: string;
  deep_orange_500: string;
  deep_orange_600: string;
  deep_orange_700: string;
  deep_orange_800: string;
  deep_orange_900: string;
  deep_orange_a100: string;
  deep_orange_a200: string;
  deep_orange_a400: string;
  deep_orange_a700: string;
  brown_50: string;
  brown_100: string;
  brown_200: string;
  brown_300: string;
  brown_400: string;
  brown_500: string;
  brown_600: string;
  brown_700: string;
  brown_800: string;
  brown_900: string;
  grey_50: string;
  grey_100: string;
  grey_200: string;
  grey_300: string;
  grey_400: string;
  grey_500: string;
  grey_600: string;
  grey_700: string;
  grey_800: string;
  grey_900: string;
  blue_grey_50: string;
  blue_grey_100: string;
  blue_grey_200: string;
  blue_grey_300: string;
  blue_grey_400: string;
  blue_grey_500: string;
  blue_grey_600: string;
  blue_grey_700: string;
  blue_grey_800: string;
  blue_grey_900: string;
  dark_primary: string;
  dark_secondary: string;
  dark_disabled: string;
  dark_dividers: string;
  dark_icon_active: string;
  dark_icon_inactive: string;
  light_primary: string;
  light_secondary: string;
  light_disabled: string;
  light_dividers: string;
  light_icon_active: string;
  light_icon_inactive: string;
  white: string;
  black: string;
};
export type Theme = {
  colors: Colors;

  semanticColors: {
    background: string;
    surface: string;
    left: string;
    surfaceSelected: string;
    textPrimary: string;
    textBackground: string;
    primary: string;
    secondary: string;
    dividers: string;
    gain: string;
    gainLoud: string;
    loss: string;
  };
};

const materialColors = JSON.parse(
  '{"red_50": "#ffebee","red_100": "#ffcdd2","red_200": "#ef9a9a","red_300": "#e57373","red_400": "#ef5350","red_500": "#f44336","red_600": "#e53935","red_700": "#d32f2f","red_800": "#c62828","red_900": "#b71c1c","red_a100": "#ff8a80","red_a200": "#ff5252","red_a400": "#ff1744","red_a700": "#d50000","pink_50": "#fce4ec","pink_100": "#f8bbd0","pink_200": "#f48fb1","pink_300": "#f06292","pink_400": "#ec407a","pink_500": "#e91e63","pink_600": "#d81b60","pink_700": "#c2185b","pink_800": "#ad1457","pink_900": "#880e4f","pink_a100": "#ff80ab","pink_a200": "#ff4081","pink_a400": "#f50057","pink_a700": "#c51162","purple_50": "#f3e5f5","purple_100": "#e1bee7","purple_200": "#ce93d8","purple_300": "#ba68c8","purple_400": "#ab47bc","purple_500": "#9c27b0","purple_600": "#8e24aa","purple_700": "#7b1fa2","purple_800": "#6a1b9a","purple_900": "#4a148c","purple_a100": "#ea80fc","purple_a200": "#e040fb","purple_a400": "#d500f9","purple_a700": "#aa00ff","deep_purple_50": "#ede7f6","deep_purple_100": "#d1c4e9","deep_purple_200": "#b39ddb","deep_purple_300": "#9575cd","deep_purple_400": "#7e57c2","deep_purple_500": "#673ab7","deep_purple_600": "#5e35b1","deep_purple_700": "#512da8","deep_purple_800": "#4527a0","deep_purple_900": "#311b92","deep_purple_a100": "#b388ff","deep_purple_a200": "#7c4dff","deep_purple_a400": "#651fff","deep_purple_a700": "#6200ea","indigo_50": "#e8eaf6","indigo_100": "#c5cae9","indigo_200": "#9fa8da","indigo_300": "#7986cb","indigo_400": "#5c6bc0","indigo_500": "#3f51b5","indigo_600": "#3949ab","indigo_700": "#303f9f","indigo_800": "#283593","indigo_900": "#1a237e","indigo_a100": "#8c9eff","indigo_a200": "#536dfe","indigo_a400": "#3d5afe","indigo_a700": "#304ffe","blue_50": "#e3f2fd","blue_100": "#bbdefb","blue_200": "#90caf9","blue_300": "#64b5f6","blue_400": "#42a5f5","blue_500": "#2196f3","blue_600": "#1e88e5","blue_700": "#1976d2","blue_800": "#1565c0","blue_900": "#0d47a1","blue_a100": "#82b1ff","blue_a200": "#448aff","blue_a400": "#2979ff","blue_a700": "#2962ff","light_blue_50": "#e1f5fe","light_blue_100": "#b3e5fc","light_blue_200": "#81d4fa","light_blue_300": "#4fc3f7","light_blue_400": "#29b6f6","light_blue_500": "#03a9f4","light_blue_600": "#039be5","light_blue_700": "#0288d1","light_blue_800": "#0277bd","light_blue_900": "#01579b","light_blue_a100": "#80d8ff","light_blue_a200": "#40c4ff","light_blue_a400": "#00b0ff","light_blue_a700": "#0091ea","cyan_50": "#e0f7fa","cyan_100": "#b2ebf2","cyan_200": "#80deea","cyan_300": "#4dd0e1","cyan_400": "#26c6da","cyan_500": "#00bcd4","cyan_600": "#00acc1","cyan_700": "#0097a7","cyan_800": "#00838f","cyan_900": "#006064","cyan_a100": "#84ffff","cyan_a200": "#18ffff","cyan_a400": "#00e5ff","cyan_a700": "#00b8d4","teal_50": "#e0f2f1","teal_100": "#b2dfdb","teal_200": "#80cbc4","teal_300": "#4db6ac","teal_400": "#26a69a","teal_500": "#009688","teal_600": "#00897b","teal_700": "#00796b","teal_800": "#00695c","teal_900": "#004d40","teal_a100": "#a7ffeb","teal_a200": "#64ffda","teal_a400": "#1de9b6","teal_a700": "#00bfa5","green_50": "#e8f5e9","green_100": "#c8e6c9","green_200": "#a5d6a7","green_300": "#81c784","green_400": "#66bb6a","green_500": "#4caf50","green_600": "#43a047","green_700": "#388e3c","green_800": "#2e7d32","green_900": "#1b5e20","green_a100": "#b9f6ca","green_a200": "#69f0ae","green_a400": "#00e676","green_a700": "#00c853","light_green_50": "#f1f8e9","light_green_100": "#dcedc8","light_green_200": "#c5e1a5","light_green_300": "#aed581","light_green_400": "#9ccc65","light_green_500": "#8bc34a","light_green_600": "#7cb342","light_green_700": "#689f38","light_green_800": "#558b2f","light_green_900": "#33691e","light_green_a100": "#ccff90","light_green_a200": "#b2ff59","light_green_a400": "#76ff03","light_green_a700": "#64dd17","lime_50": "#f9fbe7","lime_100": "#f0f4c3","lime_200": "#e6ee9c","lime_300": "#dce775","lime_400": "#d4e157","lime_500": "#cddc39","lime_600": "#c0ca33","lime_700": "#afb42b","lime_800": "#9e9d24","lime_900": "#827717","lime_a100": "#f4ff81","lime_a200": "#eeff41","lime_a400": "#c6ff00","lime_a700": "#aeea00","yellow_50": "#fffde7","yellow_100": "#fff9c4","yellow_200": "#fff59d","yellow_300": "#fff176","yellow_400": "#ffee58","yellow_500": "#ffeb3b","yellow_600": "#fdd835","yellow_700": "#fbc02d","yellow_800": "#f9a825","yellow_900": "#f57f17","yellow_a100": "#ffff8d","yellow_a200": "#ffff00","yellow_a400": "#ffea00","yellow_a700": "#ffd600","amber_50": "#fff8e1","amber_100": "#ffecb3","amber_200": "#ffe082","amber_300": "#ffd54f","amber_400": "#ffca28","amber_500": "#ffc107","amber_600": "#ffb300","amber_700": "#ffa000","amber_800": "#ff8f00","amber_900": "#ff6f00","amber_a100": "#ffe57f","amber_a200": "#ffd740","amber_a400": "#ffc400","amber_a700": "#ffab00","orange_50": "#fff3e0","orange_100": "#ffe0b2","orange_200": "#ffcc80","orange_300": "#ffb74d","orange_400": "#ffa726","orange_500": "#ff9800","orange_600": "#fb8c00","orange_700": "#f57c00","orange_800": "#ef6c00","orange_900": "#e65100","orange_a100": "#ffd180","orange_a200": "#ffab40","orange_a400": "#ff9100","orange_a700": "#ff6d00","deep_orange_50": "#fbe9e7","deep_orange_100": "#ffccbc","deep_orange_200": "#ffab91","deep_orange_300": "#ff8a65","deep_orange_400": "#ff7043","deep_orange_500": "#ff5722","deep_orange_600": "#f4511e","deep_orange_700": "#e64a19","deep_orange_800": "#d84315","deep_orange_900": "#bf360c","deep_orange_a100": "#ff9e80","deep_orange_a200": "#ff6e40","deep_orange_a400": "#ff3d00","deep_orange_a700": "#dd2c00","brown_50": "#efebe9","brown_100": "#d7ccc8","brown_200": "#bcaaa4","brown_300": "#a1887f","brown_400": "#8d6e63","brown_500": "#795548","brown_600": "#6d4c41","brown_700": "#5d4037","brown_800": "#4e342e","brown_900": "#3e2723","grey_50": "#fafafa","grey_100": "#f5f5f5","grey_200": "#eeeeee","grey_300": "#e0e0e0","grey_400": "#bdbdbd","grey_500": "#9e9e9e","grey_600": "#757575","grey_700": "#616161","grey_800": "#424242","grey_900": "#212121","blue_grey_50": "#eceff1","blue_grey_100": "#cfd8dc","blue_grey_200": "#b0bec5","blue_grey_300": "#90a4ae","blue_grey_400": "#78909c","blue_grey_500": "#607d8b","blue_grey_600": "#546e7a","blue_grey_700": "#455a64","blue_grey_800": "#37474f","blue_grey_900": "#263238","dark_primary": "rgba(0,0,0,0.87)","dark_secondary": "rgba(0,0,0,0.54)","dark_disabled": "rgba(0,0,0,0.38)","dark_dividers": "rgba(0,0,0,0.12)","dark_icon_active": "rgba(0,0,0,0.54)","dark_icon_inactive": "rgba(0,0,0,0.38)","light_primary": "rgba(255,255,255,1)","light_secondary": "rgba(255,255,255,0.7)","light_disabled": "rgba(255,255,255,0.5)","light_dividers": "rgba(255,255,255,0.12)","light_icon_active": "rgba(255,255,255,1)","light_icon_inactive": "rgba(255,255,255,0.5)","white": "#ffffff","black": "#000000"}'
) as Colors;

const defaultTheme: Theme = {
  colors: materialColors,
  semanticColors: {
    background: materialColors.white,
    surface: materialColors.grey_400,
    surfaceSelected: materialColors.light_blue_200,
    textPrimary: materialColors.black,
    textBackground: materialColors.grey_500,
    primary: materialColors.blue_600,
    secondary: materialColors.green_600,
    dividers: materialColors.blue_grey_600,
    gain: materialColors.green_600,
    loss: materialColors.red_600,
  },
};

const darkTheme: Theme = {
  colors: materialColors,
  semanticColors: {
    background: materialColors.black,
    left: materialColors.blue_grey_900,
    surface: materialColors.grey_800,
    surfaceSelected: materialColors.blue_700,
    textPrimary: materialColors.white,
    textBackground: materialColors.grey_500,
    primary: materialColors.blue_600,
    secondary: materialColors.green_600,
    dividers: materialColors.blue_grey_600,
    gain: materialColors.green_600,
    gainLoud: materialColors.green_a700,
    loss: materialColors.red_600,
  },
};

export function ThemeContextProvider(props: React.PropsWithChildren<{}>) {
  return (
    <ThemeContext.Provider value={darkTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext) as Theme;
}
