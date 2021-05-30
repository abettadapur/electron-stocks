import React, { useCallback } from "react";
import styled from "frontend/styled";
import View from "../../view/View";
import Text from "../text/Text";

const TitleBarContainer = styled(View)((props) => ({
  height: 30,
  width: "100%",
  flexDirection: "row",
  backgroundColor: props.theme.semanticColors.background,
  alignItems: "center",
  padding: "0px 0px 0px 8px",
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
}));

const CloseButton = styled(Button)({
  ":hover": {
    backgroundColor: "rgb(235, 58, 42)",
  },
});

export default function TitleBar() {
  const closeWindow = useCallback(() => {}, []);

  const maximizeWindow = useCallback(() => {}, []);

  const minimizeWindow = useCallback(() => {}, []);

  return (
    <TitleBarContainer>
      <TitleContainer>
        <Text textSize="small">Stocks</Text>
      </TitleContainer>
      <ButtonsContainer>
        <Button>{"\uE921"}</Button>
        <Button>{"\uE922"}</Button>
        <CloseButton>{"\uE8BB"}</CloseButton>
      </ButtonsContainer>
    </TitleBarContainer>
  );
}
