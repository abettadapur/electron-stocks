import React, { useMemo, StrictMode } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import { ThemeContextProvider } from "./theme/Theme";

export default function UIRoot(props: React.PropsWithChildren<{}>) {
  const emotionCache = useMemo(() => createCache({ prefix: false }), []);

  return (
    <StrictMode>
      <CacheProvider value={emotionCache}>
        <ThemeContextProvider>{props.children}</ThemeContextProvider>
      </CacheProvider>
    </StrictMode>
  );
}
