import React from "react";
import styled from "frontend/styled";
import Text from "../text/Text";

type Props = {
  textColor?: string;
  size: "small" | "medium" | "large";
  transparent?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledPrimaryButton = styled.button<{
  transparent?: boolean;
}>((props) => ({
  borderRadius: 5,
  border: "none",
  margin: 0,
  padding: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: props.transparent
    ? "transparent"
    : props.theme.semanticColors.surface
}));

export default function PrimaryButton(props: Props) {
  const { size, textColor, ...nativeProps } = props;
  return (
    <StyledPrimaryButton {...nativeProps}>
      <Text textSize={size} color={textColor}>{props.children}</Text>
    </StyledPrimaryButton>
  );
}
