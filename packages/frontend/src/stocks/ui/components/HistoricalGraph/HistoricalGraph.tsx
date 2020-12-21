import React, { useEffect, MutableRefObject } from 'react';
import View from '../../view/View';
import styled from "../../../../styled";
import { drawAndFillGraphOnCanvas } from '../../Utils/graphUtils';
import dayjs from 'dayjs';
import { Period } from 'frontend/stocks/redux/stocks/Stocks.types';

type Props = {
  selectedStock: string;
  lastTradeDate: string;
  selectedPeriod: Period;
}

const GraphCanvas = styled.canvas({
  height: 200,
  width: '100%'
});

export default function HistoricalGraph(props: Props) {
  let { selectedStock, lastTradeDate, selectedPeriod } = props;

  const canvasRef = React.useRef() as MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    if (selectedStock && lastTradeDate) {
      const info = periodMap[selectedPeriod];
      let startDate = dayjs(lastTradeDate).subtract(info.goBackDays, 'day');
      drawAndFillGraphOnCanvas(selectedStock, startDate.format('MM-DD-YYYY'), lastTradeDate, info.freqPeriod, info.periodLength, canvasRef);
    }
  }, [selectedStock, selectedPeriod]);

  return (
    <View>
      <GraphCanvas height={200} width={550} onMouseDown={(e) => { debugger; }} ref={canvasRef} style={{ border: '1px solid black' }}></GraphCanvas>
    </View>
  );
}

const periodMap = {
  '1d': { goBackDays: 0, freqPeriod: 'min', periodLength: 1 },
  '5d': { goBackDays: 4, freqPeriod: 'min', periodLength: 5 },
  '1m': { goBackDays: 29, freqPeriod: 'hour', periodLength: 1 },
  '6m': { goBackDays: 179, freqPeriod: 'hour', periodLength: 4 }
}