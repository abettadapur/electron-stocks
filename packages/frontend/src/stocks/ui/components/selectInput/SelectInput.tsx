import React from "react";
import styled from "frontend/styled";
import View from "../../view/View";

const StyledSelect = styled.select((props) => ({
  backgroundColor: "transparent",
  border: "none",
  fontSize: 13,
  flex: 1,
  outline: "none",
  height: "100%",
  color: props.theme.semanticColors.textPrimary,
  "::placeholder": {
    color: props.theme.colors.grey_500,
  },
}));

const StyledSelectContainer = styled(View)((props) => ({
  padding: "0px 0px 0px 12px",
  borderRadius: 3,
  height: 32,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: props.theme.semanticColors.surface,
  border: "none",
  outline: "none",
}));

const StyledSelectOutlineContainer = styled(View)((props) => ({
  borderRadius: 6,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "transparent",

  ":focus-within": {
    borderColor: props.theme.colors.blue_600,
  },
}));

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export default React.forwardRef<HTMLSelectElement | null, Props>(
  function TextInput(props: Props, ref) {
    return (
      <StyledSelectOutlineContainer>
        <StyledSelectContainer>
          <StyledSelect {...props} ref={ref}>
            {props.children}
          </StyledSelect>

        </StyledSelectContainer>
      </StyledSelectOutlineContainer>
    );
  }
);
