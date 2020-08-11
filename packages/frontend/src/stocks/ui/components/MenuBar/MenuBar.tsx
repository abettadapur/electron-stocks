import React from "react";
import MenuBarButton from "./MenuBarButton";
import View from "../../view/View";
import styled from "frontend/styled";

const MenuBarContainer = styled(View)({
  flexDirection: "row",
  height: 50,
});

export default function MenuBar() {
  return (
    <MenuBarContainer>
      <MenuBarButton text="Stocks" />
      <MenuBarButton text="My Finances" />
    </MenuBarContainer>
  );
}
