import styled from "frontend/styled";
import React from "react";
import AnimatedNumber from "react-animated-numbers";
import { useTheme } from "../../theme/Theme";
import View from "../../view/View";
import Text from "../text/Text";

type Props = {
  value: number;
  gain?: boolean;
};

const Container = styled(View)({
  flexDirection: "row",
});

export default function AnimatedDecimal(props: Props) {
  const theme = useTheme();
  const { gain, value } = props;
  const integer = Math.floor(value);
  const decimal = value.toFixed(2).split(".")[1];
  const tenthsPlace = Number(decimal.charAt(0));
  const hundrethsPlace = Number(decimal.charAt(1));

  const color =
    gain !== undefined
      ? gain
        ? theme.semanticColors.gain
        : theme.semanticColors.loss
      : theme.semanticColors.textPrimary;

  return (
    <Container>
      <AnimatedNumber
        animateToNumber={integer}
        fontStyle={{
          color,
        }}
      />
      <Text color={color} textSize="medium">
        .
      </Text>
      <AnimatedNumber
        animateToNumber={tenthsPlace}
        fontStyle={{
          color,
        }}
      />
      <AnimatedNumber
        animateToNumber={hundrethsPlace}
        fontStyle={{
          color,
        }}
      />
    </Container>
  );
}
