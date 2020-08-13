import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import { getWatchlist } from "frontend/stocks/redux/stocks/StocksSelectors";
import View from "../../view/View";
import styled from "../../../../styled";

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

  return (
    <WatchlistContainer>
      <InputContainer>
        <input type="text" value={inputValue} onChange={onInputChange} />
        <button onClick={onAddTicker}>Add Ticker</button>
      </InputContainer>
      {watchlist.map((w) => (
        <View>{w}</View>
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
