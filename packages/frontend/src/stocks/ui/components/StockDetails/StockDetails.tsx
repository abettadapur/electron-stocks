import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import View from "../../view/View";
import { IoMdArrowDropup } from "react-icons/io";
import HistoricalGraph from "../HistoricalGraph/HistoricalGraph";
import HistoricalPeriodButtons from "../HistoricalPeriodButtons/HistoricalPeriodButtons";
import { getQuote } from "frontend/stocks/redux/stocks/StocksSelectors";
import IEXStockQuote from "frontend/stocks/api/tiingo/models/IEXStockQuote";

type Props = {
  selected: string;
  selectedPeriod: Period;
  lastQuote: IEXStockQuote | undefined;
};

function StockDetails(props: Props) {
  let { selected, lastQuote } = props;

  if (!lastQuote || !selected) {
    return null;
  }

  return (
    <View>
      <View>{props.selected}</View>
      <View>
        <div>
          <span>${lastQuote.price}</span>
          <span
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
            <IoMdArrowDropup
              style={{
                fontSize: 25,
                color: lastQuote.price > lastQuote.prevClose ? "green" : "red",
              }}
            />
          </span>
        </div>
      </View>
      <View>
        <HistoricalGraph />
        <HistoricalPeriodButtons
          periods={["1d", "5d", "1m", "6m", "ytd"]}
        ></HistoricalPeriodButtons>
      </View>
    </View>
  );
}

const mapStateToProps = (state: StocksAwareState): Props => ({
  selected: state.stocks.selected,
  selectedPeriod: state.stocks.selectedPeriod,
  lastQuote: getQuote(state, state.stocks.selected),
});

export default connect(mapStateToProps)(StockDetails);
