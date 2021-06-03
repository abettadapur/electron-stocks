import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import View from "../../view/View";
import HistoricalGraph, {
  HistoricalPriceInformation,
} from "../HistoricalGraph/HistoricalGraph";
import HistoricalPeriodButtons from "../HistoricalPeriodButtons/HistoricalPeriodButtons";
import {
  getQuote,
  selectIsSelectedTickerInWatchlist,
} from "frontend/stocks/redux/stocks/StocksSelectors";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import Text from "../text/Text";
import styled from "frontend/styled";
import {
  MdStar,
  MdStarBorder,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import IconButton from "../button/IconButton";
import { useTheme } from "../../theme/Theme";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import Button from "../button/Button";
import TickerPeriodDetailsPane from "../TickerPeriodDetailsPane/TickerPeriodDetailsPane";
import AnimatedNumber from "react-animated-numbers";
import AnimatedDecimal from "../animatedDecimal/AnimatedDecimal";

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

const PctQuoteSuffix = styled(Text)<{ gain: boolean }>((props) => ({
  color: props.gain
    ? props.theme.semanticColors.gain
    : props.theme.semanticColors.loss,
}));

const TickerPeriodDetailsWrapper = styled(View)<{ show: boolean }>((props) => ({
  overflow: "hidden",
  transition: "height linear 200ms",
  height: props.show ? 100 : 0,
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
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [historicalPriceInfo, setHistoricalPriceInfo] =
    useState<HistoricalPriceInformation | undefined>();

  const onGraphHover = useCallback((priceInfo?: HistoricalPriceInformation) => {
    setHistoricalPriceInfo(priceInfo);
  }, []);

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

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Quote
        isInWatchlist={isInWatchlist}
        lastQuote={lastQuote}
        historicalPriceInformation={historicalPriceInfo}
        toggleWatchlist={toggleWatchlist}
      />
      <View style={{ flex: 1, maxHeight: 500 }}>
        <HistoricalGraph onHover={onGraphHover} />
        <View style={{ flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <HistoricalPeriodButtons
              periods={["1d", "5d", "1m", "6m", "ytd", "1y", "5y"]}
            ></HistoricalPeriodButtons>
          </div>
          <div>
            <IconButton
              icon={showDetails ? MdKeyboardArrowDown : MdKeyboardArrowUp}
              size="medium"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
        </View>
        <TickerPeriodDetailsWrapper show={showDetails}>
          <TickerPeriodDetailsPane />
        </TickerPeriodDetailsWrapper>
      </View>
    </View>
  );
}

type QuoteProps = {
  isInWatchlist: boolean;
  lastQuote: IEXStockQuote;
  historicalPriceInformation?: HistoricalPriceInformation;
  toggleWatchlist: () => void;
};

function Quote(props: QuoteProps) {
  const {
    lastQuote,
    isInWatchlist,
    historicalPriceInformation,
    toggleWatchlist,
  } = props;

  let price: number;
  let endPrice: number | undefined;
  let priceDiff: number;
  let pctDiff: number;

  if (historicalPriceInformation) {
    if (historicalPriceInformation.type === "quote") {
      price = historicalPriceInformation.price;
      priceDiff = historicalPriceInformation.price - lastQuote.prevClose;
      pctDiff =
        ((historicalPriceInformation.price - lastQuote.prevClose) /
          lastQuote.prevClose) *
        100;
    } else {
      price = historicalPriceInformation.begin.price;
      endPrice = historicalPriceInformation.end.price;
      priceDiff =
        historicalPriceInformation.end.price -
        historicalPriceInformation.begin.price;
      pctDiff = (priceDiff / historicalPriceInformation.begin.price) * 100;
    }
  } else {
    price = lastQuote.price;
    priceDiff = lastQuote.price - lastQuote.prevClose;
    pctDiff =
      ((lastQuote.price - lastQuote.prevClose) / lastQuote.prevClose) * 100;
  }

  const gain = priceDiff > 0;
  const plusOrMinus = gain ? "+" : "-";
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View>
        <Text textSize="medium">{lastQuote.symbol.toUpperCase()}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {endPrice ? (
            <Text textSize="medium">{`${price.toFixed(2)} - ${endPrice.toFixed(
              2
            )}`}</Text>
          ) : (
            <AnimatedDecimal value={price} />
          )}
          <PriceQuote textSize="medium" gain={gain}>
            {plusOrMinus}
          </PriceQuote>
          <AnimatedDecimal value={Math.abs(priceDiff)} gain={gain} />
          <PctQuote textSize="medium" gain={gain}>
            ({plusOrMinus}
          </PctQuote>
          <AnimatedDecimal value={Math.abs(pctDiff)} gain={gain} />
          <PctQuoteSuffix gain={gain} textSize="medium">
            %)
          </PctQuoteSuffix>
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
