import React, { useMemo, StrictMode } from "react";
import createCache from "@emotion/cache";
import { ThemeContext, CacheProvider, Global } from "@emotion/core";
import { ThemeContextProvider } from "./theme/Theme";

export default function UIRoot(props: React.PropsWithChildren<{}>) {
  const emotionCache = useMemo(() => createCache({ prefix: false }), []);
  const defaultTheme = useMemo(() => ({ colors: { black: "#000000" } }), []);
  return (
    <StrictMode>
      <CacheProvider value={emotionCache}>
        <Global styles={globalStyles} />
        <ThemeContext.Provider value={defaultTheme}>
          {props.children}
        </ThemeContext.Provider>
      </CacheProvider>
    </StrictMode>
  );
}

const globalStyles = {
  "html, body, #root": {
    height: "100vh",
    width: "100vw",
    margin: 0,
    display: "flex",
    fontFamily: "Segoe UI",
    overflow: "hidden",
    userSelect: "none",
    cursor: "default",
    padding: 0,
  },
} as const;
