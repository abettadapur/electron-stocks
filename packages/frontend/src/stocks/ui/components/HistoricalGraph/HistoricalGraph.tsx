import React, { useEffect, MutableRefObject, useState } from "react";
import View from "../../view/View";
import styled from "../../../../styled";
import {
  StocksAwareState,
  Period,
} from "frontend/stocks/redux/stocks/Stocks.types";
import {
  getSelectedHistoricalData,
  getQuote,
} from "frontend/stocks/redux/stocks/StocksSelectors";
import { connect } from "react-redux";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import { HISTORICAL_PERIOD_INFO } from "frontend/stocks/redux/stocks/StocksConstants";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { Theme, useTheme } from "../../theme/Theme";
import throttle from "lodash.throttle";

type Props = {
  historicalData: IEXHistorical[] | EODHistorical[] | undefined;
  period: Period;
  lastQuote: IEXStockQuote;
};

type Point = { x: number; y: number };

const GraphCanvas = styled.canvas({
  height: "100%",
  width: "100%",
});

function HistoricalGraph(props: Props) {
  let { historicalData, period, lastQuote } = props;
  const [canvasDimensions, setCanvasDimensions] =
    useState<{ height: number; width: number } | null>(null);
  const canvasRef = React.useRef() as MutableRefObject<HTMLCanvasElement>;
  const mousePointRef = React.useRef<Point | null>(null);
  const mouseClickPointRef = React.useRef<Point | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasDimensions({ height: rect.height, width: rect.width });
    }
  }, []);

  useEffect(() => {
    const listener = throttle(() => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasDimensions({ height: rect.height, width: rect.width });
      }
    }, 1000);
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  useEffect(() => {
    if (historicalData && historicalData.length > 0) {
      drawGraph(
        historicalData,
        period,
        lastQuote,
        mousePointRef.current,
        mouseClickPointRef.current,
        canvasRef,
        theme
      );
    }
  }, [historicalData, canvasDimensions]);

  return (
    <View style={{ flex: 1 }}>
      <GraphCanvas
        height={canvasDimensions?.height || 0}
        width={canvasDimensions?.width || 0}
        onMouseLeave={(e) => {
          mousePointRef.current = null;
          requestAnimationFrame(() => {
            if (historicalData && historicalData.length > 0) {
              drawGraph(
                historicalData,
                period,
                lastQuote,
                mousePointRef.current,
                mouseClickPointRef.current,
                canvasRef,
                theme
              );
            }
          });
        }}
        onMouseMove={(e) => {
          mousePointRef.current = { x: e.clientX, y: e.clientY };
          requestAnimationFrame(() => {
            if (historicalData && historicalData.length > 0) {
              drawGraph(
                historicalData,
                period,
                lastQuote,
                mousePointRef.current,
                mouseClickPointRef.current,
                canvasRef,
                theme
              );
            }
          });
        }}
        onMouseDown={(e) => {
          mouseClickPointRef.current = { x: e.clientX, y: e.clientY };
        }}
        onMouseUp={(e) => {
          mouseClickPointRef.current = null;
        }}
        ref={canvasRef}
        style={{ border: "1px solid black" }}
      ></GraphCanvas>
    </View>
  );
}

const mapStateToProps = (state: StocksAwareState) => {
  return {
    historicalData: getSelectedHistoricalData(state),
    period: state.stocks.selectedPeriod,
    lastQuote: getQuote(state, state.stocks.selected),
  };
};

export default connect(mapStateToProps, null)(HistoricalGraph);

function drawGraph(
  data: IEXHistorical[] | EODHistorical[],
  selectedPeriod: Period,
  lastQuote: IEXStockQuote,
  mousePoint: Point | null,
  mouseClickPoint: Point | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  theme: Theme
) {
  const { min, max } = getMinMaxOverPeriod(data);
  const periodInfo = HISTORICAL_PERIOD_INFO[selectedPeriod || "1d"];
  const yDividerCount = periodInfo.yDividerCount;
  let yDividers = [min];
  let dividerHeight = (max - min) / (yDividerCount - 1);
  const isUp =
    selectedPeriod === "1d"
      ? data[data.length - 1].close > lastQuote.prevClose
      : data[0].close < lastQuote.prevClose;

  for (var i = 0; i < yDividerCount - 2; i++) {
    yDividers.push(min + dividerHeight * (i + 1));
  }
  yDividers.push(max);

  function priceToY(price: number) {
    const pixelsPerDollar = (canvasRef.current.height - 20) / (max - min); // vertical padding in canvas
    const diffFromMin = price - min;
    return Math.round(
      canvasRef.current.height - (10 + diffFromMin * pixelsPerDollar)
    );
  }

  function indexToX(index: number) {
    const pixelsPerIndex = canvasRef.current.width / (data.length - 1);
    return Math.round(index * pixelsPerIndex);
  }

  function xToIndex(x: number) {
    const pixelsPerIndex = canvasRef.current.width / (data.length - 1);
    return Math.min(data.length - 1, Math.round(x / pixelsPerIndex));
  }

  function mousePointToCanvasPoint(point: Point): Point {
    const boundingRect = canvasRef.current.getBoundingClientRect();

    const scaleX = canvasRef.current.width / boundingRect.width; // relationship bitmap vs. element for X
    const scaleY = canvasRef.current.height / boundingRect.height; // relationship bitmap vs. element for Y
    return {
      x: (point.x - boundingRect.x) * scaleX,
      y: (point.y - boundingRect.y) * scaleY,
    };
  }

  let ctx = canvasRef.current.getContext("2d");
  if (!ctx) {
    return;
  }

  // Line Chart
  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  ctx.beginPath();
  ctx?.setLineDash([]);
  data.forEach((point, index) => {
    ctx!.lineWidth = 4;
    ctx!.strokeStyle = isUp
      ? theme.semanticColors.gain
      : theme.semanticColors.loss;
    const x = indexToX(index);
    const y = priceToY(point.close);
    if (!index) {
      // start line at first index price
      ctx?.moveTo(x, y);
    } else {
      ctx?.lineTo(x, y);
    }
  });
  ctx?.stroke();
  ctx?.closePath();

  // Chart Fill
  ctx.beginPath();
  let minIndex = 0;
  let maxIndex = data.length - 1;
  if (mousePoint && mouseClickPoint) {
    const clickCanvasPoint = mousePointToCanvasPoint(mouseClickPoint);
    const currentCanvasPoint = mousePointToCanvasPoint(mousePoint);
    minIndex = xToIndex(Math.min(currentCanvasPoint.x, clickCanvasPoint.x));
    maxIndex = xToIndex(Math.max(currentCanvasPoint.x, clickCanvasPoint.x));
  }

  data.forEach((point, index) => {
    if (index < minIndex || index > maxIndex) {
      return;
    }

    ctx!.lineWidth = 4;
    ctx!.strokeStyle = isUp
      ? theme.semanticColors.gain
      : theme.semanticColors.loss;
    const x = indexToX(index);
    const y = priceToY(point.close);
    if (!index || index === minIndex) {
      // start line at first index price
      ctx?.moveTo(x, y);
    } else {
      ctx?.lineTo(x, y);
    }
  });
  ctx?.lineTo(indexToX(maxIndex), priceToY(data[maxIndex].close));
  ctx?.lineTo(indexToX(maxIndex), canvasRef.current.height);
  ctx?.lineTo(indexToX(minIndex), canvasRef.current.height);
  ctx?.lineTo(indexToX(minIndex), priceToY(data[minIndex].close));

  let grd = ctx.createLinearGradient(0, priceToY(max), 0, priceToY(min));
  grd.addColorStop(0, isUp ? "#a4dfb4" : "#ffbbbb");
  grd.addColorStop(1, theme.semanticColors.background);

  ctx.fillStyle = grd;

  ctx!.fill();
  ctx!.closePath();

  function drawMousePoint(_mousePoint: Point) {
    if (!ctx) {
      return;
    }

    const canvasPoint = mousePointToCanvasPoint(_mousePoint);
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.strokeStyle = theme.semanticColors.textPrimary;
    ctx.lineWidth = 1;
    ctx.moveTo(canvasPoint.x, 0);
    ctx.lineTo(canvasPoint.x, canvasRef.current.height);
    ctx.stroke();
    ctx.closePath();

    // Draw the price point on the graph
    const index = xToIndex(canvasPoint.x);
    const point = data[index];
    const y = priceToY(point.close);

    ctx.fillStyle = isUp
      ? theme.semanticColors.gain
      : theme.semanticColors.loss;
    ctx.strokeStyle = isUp
      ? theme.semanticColors.gain
      : theme.semanticColors.loss;
    ctx.beginPath();
    ctx.arc(canvasPoint.x, y, 6, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  // Draw the mouse line
  if (mousePoint) {
    drawMousePoint(mousePoint);
    if (mouseClickPoint) {
      drawMousePoint(mouseClickPoint);
    }

    const canvasPoint = mousePointToCanvasPoint(mousePoint);
    // Draw the price point on the graph
    const index = xToIndex(canvasPoint.x);
    const point = data[index];

    if (mouseClickPoint) {
      const canvasClickPoint = mousePointToCanvasPoint(mouseClickPoint);

      const beginIndex = xToIndex(Math.min(canvasPoint.x, canvasClickPoint.x));
      const endIndex = xToIndex(Math.max(canvasPoint.x, canvasClickPoint.x));

      const beginPoint = data[beginIndex];
      const endPoint = data[endIndex];
      const diff = endPoint.close - beginPoint.close;
      const diffPct = (diff / beginPoint.close) * 100;
      const gain = diff > 0;

      // Draw the price text
      ctx.fillStyle = gain
        ? theme.semanticColors.gain
        : theme.semanticColors.loss;
      ctx.font = "18px Segoe UI";
      ctx.fillText(
        `${gain ? "+" : "-"} ${Math.abs(diff).toFixed(2)} (${Math.abs(
          diffPct
        ).toFixed(2)}%)`,
        canvasPoint.x + 4,
        40
      );
    } else {
      // Draw the price text
      ctx.fillStyle = theme.semanticColors.textPrimary;
      ctx.font = "18px Segoe UI";
      ctx.fillText(`${point.close.toFixed(2)}`, canvasPoint.x + 4, 40);
    }
  }

  // Draw y dividers
  yDividers.forEach((divider, i) => {
    if (!(i === 0 || i === yDividers.length - 1)) {
      ctx!.setLineDash([5]);
      ctx!.beginPath();
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "#dddddd";
      ctx?.moveTo(0, priceToY(divider));
      ctx?.lineTo(canvasRef.current.width, priceToY(divider));
      ctx?.stroke();
      ctx?.closePath();
    }
  });
}

function getMinMaxOverPeriod(data: EODHistorical[] | IEXHistorical[]): {
  max: number;
  min: number;
} {
  let max = data[0].close;
  let min = data[0].close;
  data.forEach((point) => {
    max = Math.max(point.close, max);
    min = Math.min(point.close, min);
  });
  return {
    max,
    min,
  };
}
