import React from "react";
import styled from "frontend/styled";
import View from "../../view/View";
import Text from "../text/Text";

const TitleBarContainer = styled(View)((props) => ({
  height: 30,
  width: "100%",
  flexDirection: "row",
  backgroundColor: props.theme.semanticColors.background,
  alignItems: "center",
  padding: "0px 8px",
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
  color: props.theme.semanticColors.textPrimary,
}));

export default function TitleBar() {
  return (
    <TitleBarContainer>
      <TitleContainer>
        <Text textSize="small">Stocks</Text>
      </TitleContainer>
      <ButtonsContainer>
        <Button>{"\uE921"}</Button>
        <Button>{"\uE922"}</Button>
        <Button>{"\uE8BB"}</Button>
      </ButtonsContainer>
    </TitleBarContainer>
  );
}
