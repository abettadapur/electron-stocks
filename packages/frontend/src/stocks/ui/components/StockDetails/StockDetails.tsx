import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { StocksAwareState, Period } from 'frontend/stocks/redux/stocks/Stocks.types';
import View from "../../view/View";
import { getIntradayQuote } from 'frontend/stocks/api/tiingo';
import { IoMdArrowDropup } from 'react-icons/io';
import HistoricalGraph from '../HistoricalGraph/HistoricalGraph';
import HistoricalPeriodButtons from '../HistoricalPeriodButtons/HistoricalPeriodButtons';

type Props = {
  selected: string;
  selectedPeriod: Period;
};

function StockDetails(props: Props) {
  let { selected, selectedPeriod } = props;
  let [price, setPrice] = useState(-1);
  let [prevClose, setPrevClose] = useState(-1);
  let [lastTradeDate, setLastTradeDate] = useState('');

  useEffect(() => {
    if (selected.length) {
      getIntradayQuote(selected).then((resp) => {
        setPrevClose(resp.prevClose);
        setPrice(resp.price);
        setLastTradeDate(resp.timestamp.toLocaleDateString().replace("/", "-"))
      });
    }
  }, [selected]);
  if (selected) {
    return (
      <View>
        <View>
          {props.selected}
        </View>
        <View>
          {props.selected && price > -1 &&
            <div>
              <span>
                ${price}
              </span>
              <span style={{ color: price > prevClose ? 'green' : 'red' }}>
                + ${(price - prevClose).toFixed(2)} ({(((price - prevClose) / prevClose) * 100).toFixed(2)}%)
                <IoMdArrowDropup style={{ fontSize: 25, color: price > prevClose ? 'green' : 'red' }} />
              </span>
            </div>
          }
        </View>
        <View>
          <HistoricalGraph selectedStock={selected} selectedPeriod={selectedPeriod} lastTradeDate={lastTradeDate} />
          <HistoricalPeriodButtons periods={['1d', '5d', '1m', '6m', 'ytd']}></HistoricalPeriodButtons>
        </View>
      </View>
    );
  }
  return null;
}

const mapStateToProps = (state: StocksAwareState): Props => ({
  selected: state.stocks.selected,
  selectedPeriod: state.stocks.selectedPeriod
});

export default connect(mapStateToProps)(StockDetails);