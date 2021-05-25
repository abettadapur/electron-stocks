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
        onMouseMove={(e) => {
          mousePointRef.current = { x: e.clientX, y: e.clientY };
          requestAnimationFrame(() => {
            if (historicalData && historicalData.length > 0) {
              drawGraph(
                historicalData,
                period,
                lastQuote,
                mousePointRef.current,
                canvasRef,
                theme
              );
            }
          });
        }}
        onMouseDown={(e) => {}}
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
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  theme: Theme
) {
  const { min, max } = getMinMaxOverPeriod(data);
  const periodInfo = HISTORICAL_PERIOD_INFO[selectedPeriod || "1d"];
  const yDividerCount = periodInfo.yDividerCount;
  let yDividers = [min];
  let dividerHeight = (max - min) / (yDividerCount - 1);
  const isUp = data[data.length - 1].close > lastQuote.prevClose;

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

  ctx.beginPath();
  data.forEach((point, index) => {
    ctx!.lineWidth = 4;
    ctx!.strokeStyle = theme.colors.red_600;
    const x = indexToX(index);
    const y = priceToY(point.close);
    if (!index) {
      // start line at first index price
      ctx?.moveTo(x, y);
    } else {
      ctx?.lineTo(x, y);
    }
  });
  ctx?.lineTo(canvasRef.current.width, priceToY(data[data.length - 1].close));
  ctx?.lineTo(canvasRef.current.width, canvasRef.current.height);
  ctx?.lineTo(0, canvasRef.current.height);
  ctx?.lineTo(indexToX(0), priceToY(data[0].close));

  let grd = ctx.createLinearGradient(0, priceToY(max), 0, priceToY(min));
  grd.addColorStop(0, isUp ? "#a4dfb4" : "#ffbbbb");
  grd.addColorStop(1, theme.semanticColors.background);

  ctx.fillStyle = grd;

  ctx!.fill();
  ctx!.closePath();

  // Draw the point
  if (mousePoint) {
    const canvasPoint = mousePointToCanvasPoint(mousePoint);
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.strokeStyle = theme.semanticColors.textPrimary;
    ctx.lineWidth = 1;
    ctx.moveTo(canvasPoint.x, 0);
    ctx.lineTo(canvasPoint.x, canvasRef.current.height);
    ctx.stroke();
    ctx.closePath();
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
