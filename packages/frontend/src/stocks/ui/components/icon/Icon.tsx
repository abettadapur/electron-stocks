import React from "react";
import { IconType } from "react-icons";
import { useTheme } from "../../theme/Theme";

type Props = {
  icon: IconType;
  size: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const sizes = {
  small: 16,
  medium: 24,
  large: 32,
};

export default function Icon(props: Props) {
  const { icon, className, size, style } = props;
  const IconComponent = icon;
  const theme = useTheme();

  return (
    <IconComponent
      color={theme.semanticColors.textPrimary}
      fontSize={sizes[size]}
      className={className}
      style={style}
      onClick={props.onClick}
    />
  );
}
