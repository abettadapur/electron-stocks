import styled from "frontend/styled";
import React from "react";
import View from "../../view/View";

type TextSize = "small" | "medium" | "large";
type TextProps = React.HTMLProps<HTMLDivElement> &
  React.PropsWithChildren<{
    color?: string;
    textSize: TextSize;
  }>;

const sizes = {
  small: 12,
  medium: 16,
  large: 20,
};

const TextView = styled(View)<{ color?: string; textSize: TextSize }>(
  (props) => ({
    color: props.color ? props.color : props.theme.semanticColors.textPrimary,
    fontSize: sizes[props.textSize],
  })
);

export default React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  return (
    <TextView {...props} ref={ref}>
      {props.children}
    </TextView>
  );
});
