import React from "react";
import styled from "frontend/styled";

const TitlebarContainer = styled.div({
  height: 18,
  "-webkit-app-region": "drag",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
});

export default function MacTitleBar() {
    return <TitlebarContainer/>
}
