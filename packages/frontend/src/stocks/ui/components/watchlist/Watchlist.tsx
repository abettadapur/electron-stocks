import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import {
  getSelectedTicker,
  getWatchlist,
} from "frontend/stocks/redux/stocks/StocksSelectors";
import View from "../../view/View";
import styled from "../../../../styled";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { getQuotes } from "frontend/stocks/redux/stocks/StocksSelectors";
import WatchlistCell from "./WatchListCell";

type MappedProps = {
  selectedTicker: string;
  watchlist: string[];
  quotes: { [ticker: string]: IEXStockQuote };
};

type Props = MappedProps & typeof Actions;

const WatchlistContainer = styled(View)({
  borderRight: "1px solid black",
  flex: 1,
  marginLeft: 8,
  paddingRight: 8,
});

const Row = styled(View)({
  flexDirection: "row",
});

function Watchlist(props: Props) {
  const {
    addToWatchlist,
    removeFromWatchlist,
    selectedTicker,
    setSelectedStock,
    watchlist,
    quotes,
  } = props;
  const [inputValue, setInputValue] = useState("");

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

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onAddTicker();
      }
    },
    [onAddTicker]
  );

  const onRemoveTicker = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => {
      removeFromWatchlist(w);
      e.stopPropagation();
    },
    [watchlist]
  );

  return (
    <WatchlistContainer>
      <Row style={{ marginTop: 8 }}>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
        <button onClick={onAddTicker}>Add Ticker</button>
      </Row>
      {watchlist.map((w, i) => (
        <View
          key={i}
          onClick={() => setSelectedStock(w)}
          style={{ marginTop: 12 }}
        >
          <WatchlistCell
            ticker={w}
            selected={w === selectedTicker}
            quote={quotes[w.toLowerCase()]}
            onRemoveClicked={onRemoveTicker}
          />
        </View>
      ))}
    </WatchlistContainer>
  );
}

const Actions = {
  addToWatchlist: StocksActions.addTickerToWatchlist,
  removeFromWatchlist: StocksActions.removeTickerFromWatchlist,
  setSelectedStock: StocksActions.setSelectedStock,
};

function mapStateToProps(state: StocksAwareState): MappedProps {
  return {
    watchlist: getWatchlist(state),
    selectedTicker: getSelectedTicker(state),
    quotes: getQuotes(state),
  };
}

export default connect(mapStateToProps, Actions)(Watchlist);
