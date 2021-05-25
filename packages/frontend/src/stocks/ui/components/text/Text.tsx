import styled from "frontend/styled";
import React from "react";
import View from "../../view/View";

type TextProps = React.HTMLProps<HTMLDivElement> & React.PropsWithChildren<{
    color?: string;
}>;

const TextView = styled(View)<{ color?: string }>(props => ({
    color: props.color ? props.color : props.theme.semanticColors.textPrimary
}));

export default React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {
    return <TextView {...props} ref={ref}>{props.children}</TextView>
});