import React, { useEffect, useState } from "react";
import { getStockQuote } from "../api/alphavantage";
import MenuBar from "./components/MenuBar/MenuBar";
import { connect } from "react-redux";
import { StocksState } from "../redux/stocks/Stocks.types";
import View from "./view/View";

function Stocks(props: { menuItem: string }) {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    getStockQuote("MSFT").then((quote) => setQuote(JSON.stringify(quote)));
  });
  return (
    <div>
      <MenuBar />
      {props.menuItem === 'Stocks' &&
        <div style={grid}>
          <div style={gridCell}>Watchlist</div>
          <div style={gridCell}>Stock Info Pane</div>
        </div>
      }
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "200px minmax(400px, auto)",
  minHeight: 600,
};

const gridCell = {
  border: "1px solid black",
};

const mapStateToProps = (state: StocksState) => ({
  menuItem: state.stocks.menuBar.menuItem
});

export default connect(mapStateToProps)(Stocks);
