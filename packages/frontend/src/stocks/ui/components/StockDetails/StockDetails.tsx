import React from "react";
import { connect } from "react-redux";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import View from "../../view/View";
import { MdArrowDropUp } from "react-icons/md";
import HistoricalGraph from "../HistoricalGraph/HistoricalGraph";
import HistoricalPeriodButtons from "../HistoricalPeriodButtons/HistoricalPeriodButtons";
import { getQuote } from "frontend/stocks/redux/stocks/StocksSelectors";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import Text from "../text/Text";
import Icon from "../icon/Icon";

type Props = {
  selected: string;
  selectedPeriod: Period;
  lastQuote: IEXStockQuote | undefined;
  tickerInvalid: boolean;
};

function StockDetails(props: Props) {
  let { selected, lastQuote, tickerInvalid } = props;

  if (tickerInvalid) {
    return <div>Ticker Invalid</div>
  }

  if (!lastQuote || !selected) {
    return null;
  }

  return (
    <View>
      <Text>{props.selected.toUpperCase()}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>${lastQuote.price}</Text>
        <Text
          style={{
            color: lastQuote.price > lastQuote.prevClose ? "green" : "red",
          }}
        >
          + ${(lastQuote.price - lastQuote.prevClose).toFixed(2)} (
          {(
            ((lastQuote.price - lastQuote.prevClose) / lastQuote.prevClose) *
            100
          ).toFixed(2)}
          %)
          <Icon
            size="medium"
            icon={MdArrowDropUp}
            style={{
              color: lastQuote.price > lastQuote.prevClose ? "green" : "red",
            }}
          />
        </Text>
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
  tickerInvalid: state.stocks.tickerInvalid
});

export default connect(mapStateToProps)(StockDetails);
