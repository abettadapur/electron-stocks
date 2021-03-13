import React, { useState, useEffect, useContext } from "react";
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
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { ThemeContext } from "@emotion/core";
import styled from "../../../../styled";

type Props = {
  selected: string;
  selectedPeriod: Period;
  lastQuote: IEXStockQuote | undefined;
  tickerInvalid: boolean;
};

const StockDetailsWrapper = styled(View)<{ theme: any }>(props => ({
  background: props.theme.background
}));

function StockDetails(props: Props) {
  let { selected, lastQuote, tickerInvalid } = props;

  if (tickerInvalid) {
    return <div>Ticker Invalid</div>
  }

  if (!lastQuote || !selected) {
    return null;
  }

  const currentTheme = useContext(ThemeContext)
  return (
    <StockDetailsWrapper theme={currentTheme.colors.stockDetails}>
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
          periods={["1d", "5d", "1m", "6m", "ytd", "1y", "5y"]}
        ></HistoricalPeriodButtons>
      </View>
    </StockDetailsWrapper>
  );
}

const mapStateToProps = (state: StocksAwareState): Props => ({
  selected: state.stocks.selected,
  selectedPeriod: state.stocks.selectedPeriod,
  lastQuote: getQuote(state, state.stocks.selected),
  tickerInvalid: state.stocks.tickerInvalid
});

export default connect(mapStateToProps)(StockDetails);
