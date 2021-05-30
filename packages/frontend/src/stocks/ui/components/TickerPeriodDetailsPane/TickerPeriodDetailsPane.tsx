import React from 'react';
import { connect } from 'react-redux';
import { StocksAwareState } from 'frontend/stocks/redux/stocks/Stocks.types';
import View from '../../view/View';
import { getQuote } from 'frontend/stocks/redux/stocks/StocksSelectors';
import { IEXStockQuote } from 'frontend/stocks/api/tiingo/models/IEXStockQuote';
import Text from "../text/Text";
import styled from "frontend/styled";

interface Props {
  lastQuote: IEXStockQuote
}

const Column = styled(View)({
  flex: 1
});

const DetailsWrapper = styled(View)({
  flexDirection: 'row',
  padding: 10
});

const CellContainer = styled(View)((props) => ({
  backgroundColor: props.theme.semanticColors.surface,
  borderRadius: 8,
  padding: "6px 16px",
}));

function TickerPeriodDetailsPane(props: Props) {
  return (
    <CellContainer>
      <DetailsWrapper>
        <Column style={{ flex: 1 }}>
          <Text>Open: ${props.lastQuote.open}</Text>
          <Text>High: ${props.lastQuote.high}</Text>
          <Text>Low: ${props.lastQuote.low}</Text>
        </Column>
        <Column style={{ flex: 1 }}>
          <Text>Prev Close: ${props.lastQuote.prevClose}</Text>
          <Text>Volume: {props.lastQuote.volume}</Text>
        </Column>
      </DetailsWrapper>
    </CellContainer>
  )
}

function mapStateToProps(state: StocksAwareState) {
  return {
    lastQuote: getQuote(state, state.stocks.selected)
  }
}

export default connect(mapStateToProps, null)(TickerPeriodDetailsPane);