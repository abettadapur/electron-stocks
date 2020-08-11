import React from "react";
import styled from "frontend/styled";
import View from "../../view/View";

type MenuBarButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
};

const MenuButtonContainer = styled(View)((props) => {
  return {
    flex: 1,
    cursor: "default",
    border: `1px solid black`, //should be able to use this, but theme is empty :( ${props.theme.colors.black}`,
  };
});

const MenuButtonText = styled(View)({
  marginTop: 15,
  textAlign: "center",
});

export default function MenuBarButton(props: MenuBarButtonProps) {
  const { text } = props;
  return (
    <MenuButtonContainer>
      <MenuButtonText>{text}</MenuButtonText>
    </MenuButtonContainer>
  );
}
