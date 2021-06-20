import React from "react";
import styled from "frontend/styled";
import View from "../../view/View";

const StyledOption = styled.option((props) => ({
  backgroundColor: props.theme.semanticColors.surface,
  border: "none",
  fontSize: 13,
  flex: 1,
  outline: "none",
  height: "100%",
  color: props.theme.semanticColors.textPrimary,
}));

type Props = React.OptionHTMLAttributes<HTMLOptionElement>;

export default React.forwardRef<HTMLOptionElement | null, Props>(
  function TextInput(props: Props, ref) {
    return (
      <StyledOption {...props} ref={ref}>
        {props.children}
      </StyledOption>
    );
  }
);
