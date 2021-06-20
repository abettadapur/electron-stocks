import React from "react";
import styled from "frontend/styled";
import View from "../../view/View";
import { IconType } from "react-icons";
import Icon from "../icon/Icon";

const StyledInput = styled.input((props) => ({
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

const StyledInputContainer = styled(View)((props) => ({
  padding: "0px 0px 0px 12px",
  borderRadius: 3,
  height: 32,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: props.theme.semanticColors.surface,
  border: "none",
  outline: "none",
}));

const StyledInputOutlineContainer = styled(View)((props) => ({
  borderRadius: 6,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "transparent",

  ":focus-within": {
    borderColor: props.theme.colors.blue_600,
  },
}));

const IconContainer = styled(View)({
  marginLeft: "auto",
  padding: 8,
});

type Props = {
  rightIconProps?: {
    icon: IconType;
    color?: string;
    onClick?: () => void;
  };
} & React.InputHTMLAttributes<HTMLInputElement>;

export default React.forwardRef<HTMLInputElement | null, Props>(
  function TextInput(props: Props, ref) {
    const { rightIconProps } = props;
    return (
      <StyledInputOutlineContainer>
        <StyledInputContainer>
          <StyledInput type="text" {...props} ref={ref} />
          {rightIconProps && (
            <IconContainer>
              <Icon
                icon={rightIconProps.icon}
                size="small"
                style={{ color: rightIconProps.color }}
                onClick={rightIconProps.onClick}
              />
            </IconContainer>
          )}
        </StyledInputContainer>
      </StyledInputOutlineContainer>
    );
  }
);
