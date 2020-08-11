import React from "react";
import { ThemeContext } from "@emotion/core";

export type Theme = {
  colors: {
    white: string;
    black: string;
  };
};

const defaultTheme: Theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
  },
};

export function ThemeContextProvider(props: React.PropsWithChildren<{}>) {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
}
