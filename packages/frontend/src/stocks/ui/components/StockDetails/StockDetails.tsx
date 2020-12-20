import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { StocksAwareState } from 'frontend/stocks/redux/stocks/Stocks.types';
import View from "../../view/View";
import { getIntradayQuote } from 'frontend/stocks/api/tiingo';
import { IoMdArrowDropup } from 'react-icons/io';
import HistoricalGraph from '../HistoricalGraph/HistoricalGraph';

type Props = {
  selected: string;
};

function StockDetails(props: Props) {
  let { selected } = props;
  let [price, setPrice] = useState(-1);
  let [prevClose, setPrevClose] = useState(-1);

  useEffect(() => {
    if (selected.length) {
      getIntradayQuote(selected).then((resp) => {
        setPrevClose(resp.prevClose);
        setPrice(resp.price);
      });
    }
  }, [selected])

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
        <HistoricalGraph selectedStock={selected} />
      </View>
    </View>
  )
}

const mapStateToProps = (state: StocksAwareState): Props => ({
  selected: state.stocks.selected
});

export default connect(mapStateToProps)(StockDetails);