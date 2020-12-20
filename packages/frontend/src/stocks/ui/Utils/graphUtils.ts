import { getHistoricalData } from 'frontend/stocks/api/tiingo';
import IEXHistorical from 'frontend/stocks/api/tiingo/models/IEXHistorical';

export function drawAndFillGraphOnCanvas(ticker: string, startDate: string, endDate: string, period: "min" | "hour", periodLength: number, canvasRef: React.MutableRefObject<HTMLCanvasElement>) {
  getHistoricalData(ticker, startDate, endDate, period, periodLength).then((data) => {
    const { min, max } = getMinMaxOverPeriod(data);

    function priceToY(price: number) {
      const pixelsPerDollar = (canvasRef.current.height - 20) / (max - min); // vertical padding in canvas
      const diffFromMin = price - min;
      return Math.round(canvasRef.current.height - (10 + (diffFromMin * pixelsPerDollar)));
    }

    function indexToX(index: number) {
      const pixelsPerIndex = canvasRef.current.width / (data.length - 1);
      return Math.round(index * pixelsPerIndex);
    }


    let ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath();
    data.forEach((point, index) => {
      ctx.lineWidth = "2";
      ctx.strokeStyle = "green";
      const x = indexToX(index);
      const y = priceToY(point.close)
      if (!index) { // start line at first index price
        ctx?.moveTo(x, y);
      } else {
        ctx?.lineTo(x, y);
      }
    });
    ctx?.stroke();
    ctx?.closePath();

    ctx.beginPath();
    data.forEach((point, index) => {
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      const x = indexToX(index);
      const y = priceToY(point.close)
      if (!index) { // start line at first index price
        ctx?.moveTo(x, y);
      } else {
        ctx?.lineTo(x, y);
      }
    });
    ctx?.lineTo(canvasRef.current.width, priceToY(data[data.length - 1].close));
    ctx?.lineTo(canvasRef.current.width, canvasRef.current.height);
    ctx?.lineTo(0, canvasRef.current.height);
    ctx?.lineTo(indexToX(0), priceToY(data[0].close));
    ctx.fillStyle = "lightgreen";
    ctx?.fill()
    ctx?.closePath();
  });
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