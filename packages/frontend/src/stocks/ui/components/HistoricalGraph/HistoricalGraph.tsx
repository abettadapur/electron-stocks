import React, { useEffect, MutableRefObject } from 'react';
import View from '../../view/View';
import styled from "../../../../styled";
import { getHistoricalData } from 'frontend/stocks/api/tiingo';
import IEXHistorical from 'frontend/stocks/api/tiingo/models/IEXHistorical';
import { drawAndFillGraphOnCanvas } from '../../Utils/graphUtils';

type Props = {
  selectedStock: string;
}

const GraphCanvas = styled.canvas({
  height: 200,
  width: '100%'
});

export default function HistoricalGraph(props: Props) {
  let { selectedStock } = props;

  const canvasRef = React.useRef() as MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    if (selectedStock) {
      drawAndFillGraphOnCanvas(selectedStock, '12-01-2020', '12-19-2020', 'hour', 1, canvasRef);
    }
  }, [selectedStock]);

  return (
    <View>
      <GraphCanvas height={200} width={550} onMouseDown={(e) => { debugger; }} ref={canvasRef} style={{ border: '1px solid black' }}></GraphCanvas>
    </View>
  );
}