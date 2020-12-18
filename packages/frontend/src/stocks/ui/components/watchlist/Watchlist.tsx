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

const Row = styled(View)({
  flexDirection: "row",
});

const TallRow = styled(Row)({
  height: 60,
  lineHeight: '60px',
  fontSize: 20
});

const ColumnLarge = styled(View)({
  flex: 2,
  maxWidth: '40%'
});

const ColumnSmall = styled(View)({
  flex: 1
});

const DeleteButton = styled.button({
  height: 20,
  background: 'Transparent',
  border: 'none'
});

function Watchlist(props: Props) {
  const { addToWatchlist, removeFromWatchlist, setSelectedStock, watchlist } = props;

  const [inputValue, setInputValue] = useState("");
  const [quotes, setQuotes] = useState({});

  const [hovered, setHovered] = useState(-1);

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

  const onRemoveTicker = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => {
    removeFromWatchlist(w);
    e.stopPropagation();
  }, [watchlist]);

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
      <Row>
        <input type="text" value={inputValue} onChange={onInputChange} />
        <button onClick={onAddTicker}>Add Ticker</button>
      </Row>
      {watchlist.map((w, i) => (
        <View key={i} onMouseOver={() => setHovered(i)} onClick={() => setSelectedStock(w)}>
          <TallRow>
            <ColumnLarge>
              <View style={{ paddingLeft: 20 }}>
                {w}
              </View>
            </ColumnLarge>
            <ColumnSmall>
              <View style={{ textAlign: 'end' as 'end' }}>
                {quotes[w.toUpperCase()]}
              </View>
            </ColumnSmall>
            <ColumnSmall style={{ maxWidth: 20 }}>
              <View style={{ textAlign: 'end' as 'end', display: hovered === i ? 'block' : 'none' }}>
                <DeleteButton onClick={(e) => { onRemoveTicker(e, w) }}>
                  X
                </DeleteButton>
              </View>
            </ColumnSmall>
          </TallRow>
        </View>
      ))}
    </WatchlistContainer>
  );
}

const Actions = {
  addToWatchlist: StocksActions.addTickerToWatchlist,
  removeFromWatchlist: StocksActions.removeTickerFromWatchlist,
  setSelectedStock: StocksActions.setSelectedStock
};

function mapStateToProps(state: StocksAwareState): MappedProps {
  return {
    watchlist: getWatchlist(state),
  };
}

export default connect(mapStateToProps, Actions)(Watchlist);
