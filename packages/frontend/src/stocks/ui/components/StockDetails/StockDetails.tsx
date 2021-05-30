import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import View from "../../view/View";
import HistoricalGraph from "../HistoricalGraph/HistoricalGraph";
import HistoricalPeriodButtons from "../HistoricalPeriodButtons/HistoricalPeriodButtons";
import {
  getQuote,
  selectIsSelectedTickerInWatchlist,
} from "frontend/stocks/redux/stocks/StocksSelectors";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import Text from "../text/Text";
import styled from "frontend/styled";
import { MdStar, MdStarBorder, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import IconButton from "../button/IconButton";
import { useTheme } from "../../theme/Theme";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import Button from "../button/Button";
import TickerPeriodDetailsPane from "../TickerPeriodDetailsPane/TickerPeriodDetailsPane";

type MappedProps = {
  selected: string;
  selectedPeriod: Period;
  isInWatchlist: boolean;
  lastQuote: IEXStockQuote | undefined;
  tickerInvalid: boolean;
};

type Props = MappedProps & typeof Actions;

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

const TickerPeriodDetailsWrapper = styled(View)<{ show: boolean }>((props) => ({
  overflow: 'hidden',
  transition: "height linear 200ms",
  height: props.show ? 100 : 0
}));

function StockDetails(props: Props) {
  let {
    selected,
    isInWatchlist,
    lastQuote,
    tickerInvalid,
    addToWatchlist,
    removeFromWatchlist,
  } = props;
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const canToggleWatchlist = selected && lastQuote && !tickerInvalid;

  const toggleWatchlist = useCallback(() => {
    if (!canToggleWatchlist) {
      return;
    }
    if (!isInWatchlist) {
      addToWatchlist(selected);
    } else {
      removeFromWatchlist(selected);
    }
  }, [
    canToggleWatchlist,
    selected,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  ]);

  if (tickerInvalid) {
    return <div>Ticker Invalid</div>;
  }

  if (!lastQuote || !selected) {
    return null;
  }

  const gain = lastQuote.price - lastQuote.prevClose > 0;
  const plusOrMinus = gain ? "+" : "-";

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              {Math.abs(
                ((lastQuote.price - lastQuote.prevClose) /
                  lastQuote.prevClose) *
                100
              ).toFixed(2)}
              %)
            </PctQuote>
          </View>
        </View>
        <IconButton
          icon={isInWatchlist ? MdStar : MdStarBorder}
          iconColor={theme.colors.yellow_500}
          size="medium"
          transparent={true}
          style={{ marginLeft: "auto" }}
          onClick={toggleWatchlist}
        />
      </View>
      <View style={{ flex: 1, maxHeight: 500 }}>
        <HistoricalGraph />
        <View style={{ flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <HistoricalPeriodButtons
              periods={["1d", "5d", "1m", "6m", "ytd", "1y", "5y"]}
            ></HistoricalPeriodButtons>
          </div>
          <div>
            <IconButton
              icon={showDetails ? MdKeyboardArrowDown : MdKeyboardArrowUp}
              size="medium"
              onClick={() => setShowDetails(!showDetails)} />
          </div>
        </View>
        <TickerPeriodDetailsWrapper show={showDetails}>
          <TickerPeriodDetailsPane />
        </TickerPeriodDetailsWrapper>
      </View>
    </View>
  );
}

const mapStateToProps = (state: StocksAwareState): MappedProps => ({
  selected: state.stocks.selected,
  selectedPeriod: state.stocks.selectedPeriod,
  lastQuote: getQuote(state, state.stocks.selected),
  isInWatchlist: selectIsSelectedTickerInWatchlist(state),
  tickerInvalid: state.stocks.tickerInvalid,
});

const Actions = {
  addToWatchlist: StocksActions.addTickerToWatchlist,
  removeFromWatchlist: StocksActions.removeTickerFromWatchlist,
};

export default connect(mapStateToProps, Actions)(StockDetails);
