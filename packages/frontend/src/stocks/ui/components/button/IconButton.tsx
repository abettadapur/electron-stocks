import React from "react";
import styled from "frontend/styled";
import { IconType } from "react-icons";
import Icon from "../icon/Icon";

type Props = {
  icon: IconType;
  iconColor?: string;
  size: "small" | "medium" | "large";
  transparent?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizes = {
  small: 20,
  medium: 30,
  large: 42,
};

const StyledIconButton = styled.button<{
  size: "small" | "medium" | "large";
  transparent?: boolean;
}>((props) => ({
  borderRadius: "100%",
  border: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: props.transparent
    ? "transparent"
    : props.theme.semanticColors.surface,
  height: sizes[props.size],
  width: sizes[props.size],
}));

export default function IconButton(props: Props) {
  const { size, icon, iconColor, ...nativeProps } = props;
  return (
    <StyledIconButton size={size} {...nativeProps}>
      <Icon size={size} icon={icon} style={{ color: iconColor }} />
    </StyledIconButton>
  );
}
