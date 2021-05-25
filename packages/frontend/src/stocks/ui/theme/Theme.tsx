import React from "react";
import { ThemeContext } from "@emotion/core";
import { useContext } from "react";

export type Theme = {
  colors: {
    white: string;
    black: string;
    gray: string;
  };

  semanticColors: {
    background: string;
    surface: string;
    surfaceSelected: string;
    textPrimary: string;
  }
};

const defaultTheme: Theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    gray: 'rgba(0, 0, 0, 0.3)'
  },
  semanticColors: {
    background: "#FFFFFF",
    surface: "#EAEAEA",
    surfaceSelected: "#C1E1EC",
    textPrimary: "#000000"
  }
};


const darkTheme: Theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    gray: 'rgba(0, 0, 0, 0.3)'
  },
  semanticColors: {
    background: "#000000",
    surface: "#4A4A4A",
    surfaceSelected: "#276B80",
    textPrimary: "#FFFFFF"
  }
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