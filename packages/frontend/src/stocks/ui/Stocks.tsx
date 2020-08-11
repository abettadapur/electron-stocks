import React, { useEffect, useState } from "react";
import { getStockQuote } from "../api/alphavantage";
import MenuBar from "./components/MenuBar/MenuBar";

export default function Stocks() {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    getStockQuote("MSFT").then((quote) => setQuote(JSON.stringify(quote)));
  });
  return (
    <div>
      <MenuBar />
      <div style={grid}>
        <div style={gridCell}>Watchlist</div>
        <div style={gridCell}>Stock Info Pane</div>
      </div>
    </div>
  );
}

const grid = {
  display: 'grid',
  gridTemplateColumns: '200px minmax(400px, auto)', minHeight: 600
};

const gridCell = {
  border: '1px solid black'
};