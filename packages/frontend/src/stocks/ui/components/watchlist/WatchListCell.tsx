import { IEXStockQuote } from 'frontend/stocks/api/tiingo/models/IEXStockQuote';
import styled from 'frontend/styled';
import React, { useEffect, useRef, useState } from 'react';
import View from '../../view/View';
import Text from "frontend/stocks/ui/components/text/Text";
import { useTheme } from '../../theme/Theme';

type CellProps = {
  ticker: string;
  selected: boolean;
  onRemoveClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => void;
  quote: IEXStockQuote;
}

const CellContainer = styled(View)<{ selected: boolean }>(props => ({
  flexDirection: 'row',
  height: 60,
  fontSize: 20,
  backgroundColor: props.selected ? props.theme.semanticColors.surfaceSelected : props.theme.semanticColors.surface,
  borderRadius: 8,
  padding: 8,
  alignItems: 'center'
}));

const ColumnLarge = styled(View)({
  flex: 2,
  maxWidth: '40%'
});

const ColumnSmall = styled(View)({
  flex: 1
});

const DeleteButton = styled.button({
  height: 20,
  position: 'absolute',
  right: -2,
  top: 2,
  background: 'Transparent',
  border: 'none'
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
      }
      else {
        setPrevPrice(price);
      }
    }
  }, [price])

  if (price && prevPrice && prevPrice != price) {
    color = price > prevPrice ? 'green' : 'red';
  }

  return (
    <CellContainer selected={selected} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ColumnLarge>
        <Text>
          {ticker.toUpperCase()}
        </Text>
      </ColumnLarge>
      <ColumnSmall>
        {price && <Text style={{ textAlign: 'end' as 'end', color: color }}>
          {price.toFixed(2)}
        </Text>}
      </ColumnSmall>
      {isHovered && <DeleteButton onClick={(e) => { onRemoveClicked(e, ticker) }}>
        <i className="fas fa-times-circle" style={{ color: theme.semanticColors.textPrimary }} />
      </DeleteButton>}
    </CellContainer>
  );
}
