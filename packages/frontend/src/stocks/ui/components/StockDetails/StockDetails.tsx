import React from "react";
import { connect } from "react-redux";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import View from "../../view/View";
import HistoricalGraph from "../HistoricalGraph/HistoricalGraph";
import HistoricalPeriodButtons from "../HistoricalPeriodButtons/HistoricalPeriodButtons";
import { getQuote } from "frontend/stocks/redux/stocks/StocksSelectors";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import Text from "../text/Text";
import styled from "frontend/styled";

type Props = {
  selected: string;
  selectedPeriod: Period;
  lastQuote: IEXStockQuote | undefined;
  tickerInvalid: boolean;
};

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

function StockDetails(props: Props) {
  let { selected, lastQuote, tickerInvalid } = props;

  if (tickerInvalid) {
    return <div>Ticker Invalid</div>;
  }

  if (!lastQuote || !selected) {
    return null;
  }

  const gain = lastQuote.price - lastQuote.prevClose > 0;
  const plusOrMinus = gain ? "+" : "-";

  return (
    <View>
      <Text textSize="medium">{props.selected.toUpperCase()}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text textSize="medium">{lastQuote.price}</Text>
        <PriceQuote textSize="medium" gain={gain}>
          {plusOrMinus}
          {Math.abs(lastQuote.price - lastQuote.prevClose).toFixed(2)}
        </PriceQuote>
        <PctQuote textSize="medium" gain={gain}>
          ({plusOrMinus}
          {(
            ((lastQuote.price - lastQuote.prevClose) / lastQuote.prevClose) *
            100
          ).toFixed(2)}
          %)
        </PctQuote>
      </View>
      <View>
        <HistoricalGraph />
        <HistoricalPeriodButtons
          periods={["1d", "5d", "1m", "6m", "ytd", "1y", "5y"]}
        ></HistoricalPeriodButtons>
      </View>
    </View>
  );
}

const mapStateToProps = (state: StocksAwareState): Props => ({
  selected: state.stocks.selected,
  selectedPeriod: state.stocks.selectedPeriod,
  lastQuote: getQuote(state, state.stocks.selected),
  tickerInvalid: state.stocks.tickerInvalid,
});

export default connect(mapStateToProps)(StockDetails);
