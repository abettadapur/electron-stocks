import React, { useEffect, MutableRefObject } from 'react';
import View from '../../view/View';
import styled from "../../../../styled";
import { getHistoricalData } from 'frontend/stocks/api/tiingo';
import IEXHistorical from 'frontend/stocks/api/tiingo/models/IEXHistorical';

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
      getHistoricalData(selectedStock, '12-01-2020', '12-19-2020', 'hour', 1).then((data) => {
        const { min, max } = getMinMaxOverPeriod(data);;

        function priceToY(price: number) {
          const pixelsPerDollar = (canvasRef.current.height - 20) / (max - min); // vertical padding in canvas
          const diffFromMin = price - min;
          return canvasRef.current.height - (10 + (diffFromMin * pixelsPerDollar));
        }

        function indexToX(index: number) {
          const pixelsPerIndex = canvasRef.current.width / data.length;
          return index * pixelsPerIndex;
        }


        let ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        data.forEach((point, index) => {
          ctx.lineWidth = "1";
          ctx.strokeStyle = "green";
          if (!index) { // start line at first index price
            ctx?.moveTo(indexToX(index), priceToY(point.close));
          } else {
            ctx?.lineTo(indexToX(index), priceToY(point.close));
          }
        });
        ctx?.stroke();
        ctx?.closePath();
      });
    }
  }, [selectedStock]);

  return (
    <View>
      <GraphCanvas ref={canvasRef} style={{ border: '1px solid black' }}></GraphCanvas>
    </View>
  );
}

function getMinMaxOverPeriod(data: IEXHistorical[]): { max: number, min: number } {
  let max = data[0].close;
  let min = data[0].close;
  data.forEach((point) => {
    max = Math.max(point.close, max);
    min = Math.min(point.close, min);
  });
  return {
    max,
    min
  };
}