import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import { getWatchlist } from "frontend/stocks/redux/stocks/StocksSelectors";
import View from "../../view/View";
import styled from "../../../../styled";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { getQuotes } from "frontend/stocks/redux/stocks/StocksSelectors";

type MappedProps = {
  watchlist: string[];
  quotes: { [ticker: string]: IEXStockQuote }
};

type Props = MappedProps & typeof Actions;

type CellProps = {
  ticker: string;
  onRemoveClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => void;
  quote: IEXStockQuote;
}

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
  const { addToWatchlist, removeFromWatchlist, setSelectedStock, watchlist, quotes } = props;
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

  const onRemoveTicker = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, w: string) => {
    removeFromWatchlist(w);
    e.stopPropagation();
  }, [watchlist]);

  return (
    <WatchlistContainer>
      <Row>
        <input type="text" value={inputValue} onChange={onInputChange} />
        <button onClick={onAddTicker}>Add Ticker</button>
      </Row>
      {watchlist.map((w, i) => (
        <View key={i} onClick={() => setSelectedStock(w)}>
          <WatchlistCell ticker={w} quote={quotes[w.toLowerCase()]} onRemoveClicked={onRemoveTicker} />
        </View>
      ))}
    </WatchlistContainer>
  );
}

function WatchlistCell(props: CellProps) {
  const { ticker, quote, onRemoveClicked } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [prevPrice, setPrevPrice] = useState(quote?.price);
  const price = quote?.price;
  let color = 'black';

  if (price && prevPrice != price) {
    if (prevPrice) {
      color = price > prevPrice ? 'green' : 'red';
      setTimeout(() => {
        setPrevPrice(price);
      }, 1500);
    }
    else {
      setPrevPrice(price);
    }
  }

  return (
    <TallRow onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ColumnLarge>
        <View style={{ paddingLeft: 20 }}>
          {ticker}
        </View>
      </ColumnLarge>
      <ColumnSmall>
        {price && <View style={{ textAlign: 'end' as 'end', color: color }}>
          {price}
        </View>}
      </ColumnSmall>
      <ColumnSmall style={{ maxWidth: 20 }}>
        <View style={{ textAlign: 'end' as 'end', display: isHovered ? 'block' : 'none' }}>
          {isHovered && <DeleteButton onClick={(e) => { onRemoveClicked(e, ticker) }}>
            X
        </DeleteButton>}
        </View>
      </ColumnSmall>
    </TallRow>
  )
}

const Actions = {
  addToWatchlist: StocksActions.addTickerToWatchlist,
  removeFromWatchlist: StocksActions.removeTickerFromWatchlist,
  setSelectedStock: StocksActions.setSelectedStock
};

function mapStateToProps(state: StocksAwareState): MappedProps {
  return {
    watchlist: getWatchlist(state),
    quotes: getQuotes(state)
  };
}

export default connect(mapStateToProps, Actions)(Watchlist);
