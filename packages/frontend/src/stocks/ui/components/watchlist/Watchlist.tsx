import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import { getWatchlist } from "frontend/stocks/redux/stocks/StocksSelectors";
import View from "../../view/View";
import styled from "../../../../styled";
import { getQuotesForWatchlist } from "frontend/stocks/api/tiingo";

type MappedProps = {
  watchlist: string[];
};

type Props = MappedProps & typeof Actions;

const WatchlistContainer = styled(View)({
  borderRight: "1px solid black",
  flex: 1,
});

const InputContainer = styled(View)({
  flexDirection: "row",
});

function Watchlist(props: Props) {
  const { addToWatchlist, watchlist } = props;

  const [inputValue, setInputValue] = useState("");
  const [quotes, setQuotes] = useState({});

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const onAddTicker = useCallback(() => {
    addToWatchlist(inputValue);
    setInputValue("");
  }, [inputValue, setInputValue]);

  useEffect(() => {
    getQuotesForWatchlist(watchlist).then((resp) => {
      let newQuotes = {};
      resp.forEach((quote) => {
        newQuotes[quote.symbol] = quote.price
      });
      setQuotes(newQuotes);
    })
  }, [watchlist]);

  return (
    <WatchlistContainer>
      <InputContainer>
        <input type="text" value={inputValue} onChange={onInputChange} />
        <button onClick={onAddTicker}>Add Ticker</button>
      </InputContainer>
      {watchlist.map((w) => (
        <View>{w} {quotes[w.toUpperCase()]}</View>
      ))}
    </WatchlistContainer>
  );
}

const Actions = {
  addToWatchlist: StocksActions.addTickerToWatchlist,
};

function mapStateToProps(state: StocksAwareState): MappedProps {
  return {
    watchlist: getWatchlist(state),
  };
}

export default connect(mapStateToProps, Actions)(Watchlist);
