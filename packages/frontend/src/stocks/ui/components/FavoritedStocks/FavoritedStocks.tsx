import React, { useCallback } from "react";
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
import SearchBar from "../SearchBar/SearchBar";
import Collapsible from "../Collapsible/Collapsible";

type MappedProps = {
  selectedTicker: string;
  watchlist: string[];
  quotes: { [ticker: string]: IEXStockQuote };
};

type Props = MappedProps & typeof Actions;

const WatchlistContainer = styled(View)({
  flex: 1,
  marginLeft: 8,
  marginTop: 8,
  paddingRight: 8,
});

const SearchBarContainer = styled(View)({
  paddingRight: 12,
});

const ScrollView = styled(View)((props) => ({
  flex: 1,
  marginTop: 8,
  paddingRight: 8,
  overflowY: "auto",
  overflowX: "hidden",

  "::-webkit-scrollbar": {
    width: 7,
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: props.theme.semanticColors.surface,
  },
}));

function Watchlist(props: Props) {
  const {
    removeFromWatchlist,
    selectedTicker,
    setSelectedStock,
    watchlist,
    quotes,
  } = props;

  const onRemoveTicker = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => {
      removeFromWatchlist(w);
      e.stopPropagation();
    },
    [watchlist]
  );

  return (
    <WatchlistContainer>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      <ScrollView>
        <Collapsible text={"Watchlist"}>
          {watchlist.map((w, i) => (
            <View
              key={i}
              onClick={() => setSelectedStock(w)}
              style={{ marginTop: i !== 0 ? 12 : undefined }}
            >
              <WatchlistCell
                ticker={w}
                selected={w === selectedTicker}
                quote={quotes[w.toLowerCase()]}
                onRemoveClicked={onRemoveTicker}
              />
            </View>
          ))}
        </Collapsible>
      </ScrollView>
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
