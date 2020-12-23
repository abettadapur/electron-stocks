import { getEODHistoricalData, getIEXHistoricalData } from 'frontend/stocks/api/tiingo';
import EODHistorical from 'frontend/stocks/api/tiingo/models/EODHistorical';
import { Period } from 'frontend/stocks/redux/stocks/Stocks.types';
import dayjs from 'dayjs';
import IEXHistorical from 'frontend/stocks/api/tiingo/models/IEXHistorical';

export function drawAndFillGraphOnCanvas(ticker: string, endDate: string, selectedPeriod: Period, canvasRef: React.MutableRefObject<HTMLCanvasElement>) {
  if (selectedPeriod == '1d' || selectedPeriod == '5d') {
    const info = periodMap[selectedPeriod];
    let startDate = dayjs(endDate).subtract(info.goBackDays, 'day').format('MM-DD-YYYY');
    endDate = dayjs(endDate).add(1, 'day').format('MM-DD-YYYY');
    getIEXHistoricalData(ticker, startDate, endDate, selectedPeriod).then((data) => {
      drawGraph(data, canvasRef);
    })
  } else {
    const info = periodMap[selectedPeriod];
    let startDate = dayjs(endDate).subtract(info.goBackDays, 'day').format('MM-DD-YYYY');
    getEODHistoricalData(ticker, startDate, endDate, 'daily').then((data) => {
      drawGraph(data, canvasRef);
    });
  }
}

function drawGraph(data: any, canvasRef: React.MutableRefObject<HTMLCanvasElement>) {
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
}

function getMinMaxOverPeriod(data: EODHistorical[]): { max: number, min: number } {
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

const periodMap = {
  '1d': { goBackDays: 0, freqPeriod: 'min', periodLength: 1 },
  '5d': { goBackDays: 4, freqPeriod: 'min', periodLength: 5 },
  '1m': { goBackDays: 29, freqPeriod: 'hour', periodLength: 1 },
  '6m': { goBackDays: 179, freqPeriod: 'hour', periodLength: 4 }
}