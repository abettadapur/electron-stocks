import React, { useMemo, StrictMode } from "react";
import createCache from "@emotion/cache";
import { CacheProvider, Global } from "@emotion/core";
import { ThemeContextProvider } from "./theme/Theme";

export default function UIRoot(props: React.PropsWithChildren<{}>) {
  const emotionCache = useMemo(() => createCache({ prefix: false }), []);

  return (
    <StrictMode>
      <CacheProvider value={emotionCache}>
        <Global styles={globalStyles} />
        <ThemeContextProvider>{props.children}</ThemeContextProvider>
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
