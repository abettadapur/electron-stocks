import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import styled from "frontend/styled";
import React, { useEffect, useRef, useState } from "react";
import View from "../../view/View";
import Text from "frontend/stocks/ui/components/text/Text";
import { useTheme } from "../../theme/Theme";
import Icon from "../icon/Icon";
import { MdCancel } from "react-icons/md";

type CellProps = {
  ticker: string;
  selected: boolean;
  onRemoveClicked: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    w: string
  ) => void;
  quote: IEXStockQuote;
};

const CellContainer = styled(View)<{ selected: boolean }>((props) => ({
  flexDirection: "row",
  backgroundColor: props.selected
    ? props.theme.semanticColors.surfaceSelected
    : props.theme.semanticColors.surface,
  borderRadius: 8,
  padding: "6px 16px",
  alignItems: "center",
}));

const ColumnLarge = styled(View)({
  flex: 2,
  maxWidth: "40%",
});

const ColumnSmall = styled(View)({
  flex: 1,
  flexDirection: "column",
  alignItems: "flex-end",
});

const PriceQuote = styled(Text)<{ gain: boolean }>((props) => ({
  color: props.gain
    ? props.theme.semanticColors.gain
    : props.theme.semanticColors.loss,
  marginLeft: 12,
}));

const PctQuote = styled(Text)<{ gain: boolean }>((props) => ({
  color: props.gain
    ? props.theme.semanticColors.gain
    : props.theme.semanticColors.loss,
  marginLeft: 12,
}));

const PriceChangeContainer = styled(View)({ flexDirection: "row" });

const DeleteButton = styled.button({
  height: 20,
  position: "absolute",
  right: -2,
  top: 2,
  background: "Transparent",
  border: "none",
});

export default function WatchlistCell(props: CellProps) {
  const { ticker, quote, selected, onRemoveClicked } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [prevPrice, setPrevPrice] = useState(quote?.price);
  const price = quote?.price;
  let color: string | undefined = undefined;

  const theme = useTheme();

  const colorTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (price && prevPrice != price) {
      if (prevPrice) {
        if (colorTimeout.current) {
          clearTimeout(colorTimeout.current);
        }

        colorTimeout.current = setTimeout(() => {
          setPrevPrice(price);
        }, 1500);
      } else {
        setPrevPrice(price);
      }
    }
  }, [price]);

  if (price && prevPrice && prevPrice != price) {
    color =
      price > prevPrice ? theme.semanticColors.gain : theme.semanticColors.loss;
  }

  const gain = quote?.price - quote?.prevClose > 0;
  const plusOrMinus = gain ? "+" : "-";

  return (
    <CellContainer
      selected={selected}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ColumnLarge>
        <Text textSize="large">{ticker.toUpperCase()}</Text>
      </ColumnLarge>
      {quote && (
        <ColumnSmall>
          {price && (
            <Text textSize="large" style={{ color }}>
              {price.toFixed(2)}
            </Text>
          )}
          <PriceChangeContainer>
            <PriceQuote gain={gain} textSize="medium">
              {plusOrMinus}
              {Math.abs(quote.price - quote.prevClose).toFixed(2)}
            </PriceQuote>
            <PctQuote gain={gain} textSize="medium">
              ({plusOrMinus}
              {(
                Math.abs((quote.price - quote.prevClose) / quote.prevClose) *
                100
              ).toFixed(2)}
              %)
            </PctQuote>
          </PriceChangeContainer>
        </ColumnSmall>
      )}
      {isHovered && (
        <DeleteButton
          onClick={(e) => {
            onRemoveClicked(e, ticker);
          }}
        >
          <Icon size="small" icon={MdCancel} />
          <i
            className="fas fa-times-circle"
            style={{ color: theme.semanticColors.textPrimary }}
          />
        </DeleteButton>
      )}
    </CellContainer>
  );
}
