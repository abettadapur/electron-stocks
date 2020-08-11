import React, { useMemo, StrictMode } from "react";
import createCache from "@emotion/cache";
import { ThemeContext, CacheProvider } from "@emotion/core";
import { ThemeContextProvider } from "./theme/Theme";

export default function UIRoot(props: React.PropsWithChildren<{}>) {
  const emotionCache = useMemo(() => createCache({ prefix: false }), []);
  const defaultTheme = useMemo(() => ({ colors: { black: "#000000" } }), []);
  return (
    <StrictMode>
      <CacheProvider value={emotionCache}>
        <ThemeContext.Provider value={defaultTheme}>
          {props.children}
        </ThemeContext.Provider>
      </CacheProvider>
    </StrictMode>
  );
}
