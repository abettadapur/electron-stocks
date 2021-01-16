import React, { useEffect, MutableRefObject, useState } from "react";
import View from "../../view/View";
import styled from "../../../../styled";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import { getSelectedHistoricalData } from "frontend/stocks/redux/stocks/StocksSelectors";
import { connect } from "react-redux";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import { number } from "yargs";
import { createWriteStream } from "fs-extra";

type Props = {
  historicalData: IEXHistorical[] | EODHistorical[] | undefined;
};

type Point = { x: number; y: number };

const GraphCanvas = styled.canvas({
  height: 200,
  width: "100%",
});

function HistoricalGraph(props: Props) {
  let { historicalData } = props;
  const [mousePoint, setMousePoint] = useState<Point | null>(null);

  const canvasRef = React.useRef() as MutableRefObject<HTMLCanvasElement>;
  useEffect(() => {
    if (historicalData && historicalData.length > 0) {
      drawGraph(historicalData, mousePoint, canvasRef);
    }
  }, [historicalData, mousePoint]);

  return (
    <View>
      <GraphCanvas
        height={900}
        width={1600}
        onMouseMove={(e) => {
          setMousePoint({ x: e.clientX, y: e.clientY });
        }}
        onMouseDown={(e) => {
          debugger;
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
  };
};

export default connect(mapStateToProps, null)(HistoricalGraph);

function drawGraph(
  data: IEXHistorical[] | EODHistorical[],
  mousePoint: Point | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement>
) {
  const { min, max } = getMinMaxOverPeriod(data);

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

  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  ctx.beginPath();
  ctx?.setLineDash([]);
  data.forEach((point, index) => {
    ctx.lineWidth = "2";
    ctx.strokeStyle = "green";
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
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
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
  ctx.fillStyle = "lightgreen";
  ctx?.fill();
  ctx?.closePath();

  // Draw the point
  if (mousePoint) {
    const canvasPoint = mousePointToCanvasPoint(mousePoint);
    const index = xToIndex(canvasPoint.x);
    const dataPoint = data[index];

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(canvasPoint.x, 0);
    ctx.lineTo(canvasPoint.x, canvasRef.current.height);
    ctx.stroke();
    ctx.closePath();
  }
}

function getMinMaxOverPeriod(
  data: EODHistorical[] | IEXHistorical[]
): { max: number; min: number } {
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
