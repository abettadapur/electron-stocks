import React, { useCallback, useEffect, useState } from "react";
import styled from "frontend/styled";
import View from "../../view/View";
import Text from "../text/Text";
import bridge from "frontend/bridge";

const TitleBarContainer = styled(View)((props) => ({
  height: 30,
  width: "100%",
  flexDirection: "row",
  backgroundColor: props.theme.semanticColors.background,
  alignItems: "center",
  padding: "0px 0px 0px 8px",
  "-webkit-user-select": "none",
  "-webkit-app-region": "drag",
}));

const TitleContainer = styled(View)({
  flex: 1,
});

const ButtonsContainer = styled(View)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 46px)",
  height: "100%",
});

const Button = styled.button((props) => ({
  fontFamily: "Segoe MDL2 Assets",
  gridRow: "1 / span 1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  fontSize: 10,
  color: props.theme.semanticColors.textPrimary,
  transition: "background-color 125ms ease-in 0s, color 125ms ease-in 0s",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.19)",
  },
  "-webkit-app-region": "no-drag",
}));

const CloseButton = styled(Button)({
  ":hover": {
    backgroundColor: "rgb(235, 58, 42)",
  },
});

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);
  useEffect(() => {
    const isWindowMaximized = bridge.window.isMaximized();
    if (isWindowMaximized !== isMaximized) {
      setIsMaximized(bridge.window.isMaximized);
    }
  }, []);

  const closeWindow = useCallback(() => {
    bridge.window.close();
  }, []);

  const maximizeWindow = useCallback(() => {
    if (isMaximized) {
      bridge.window.unmaximize();
      setIsMaximized(false);
    } else {
      bridge.window.maximize();
      setIsMaximized(true);
    }
  }, [isMaximized]);

  const minimizeWindow = useCallback(() => {
    bridge.window.minimize();
  }, []);

  if (bridge.platform.os() === "darwin") {
    return null;
  }

  return (
    <TitleBarContainer>
      <TitleContainer>
        <Text textSize="small">Stocks</Text>
      </TitleContainer>
      <ButtonsContainer>
        <Button onClick={minimizeWindow}>{"\uE921"}</Button>
        <Button onClick={maximizeWindow}>
          {isMaximized ? "\uE923" : "\uE922"}
        </Button>
        <CloseButton onClick={closeWindow}>{"\uE8BB"}</CloseButton>
      </ButtonsContainer>
    </TitleBarContainer>
  );
}
