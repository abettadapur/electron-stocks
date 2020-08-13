import React from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import { connect } from "react-redux";
import { StocksState, StocksAwareState } from "../redux/stocks/Stocks.types";
import StocksView from "./components/stocksView/StocksView";
import View from "./view/View";

function Stocks(props: { menuItem: string }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuBar />
      {props.menuItem === "stocks" && <StocksView />}
    </View>
  );
}

const mapStateToProps = (state: StocksAwareState) => ({
  menuItem: state.stocks.menuBar.menuItem,
});

export default connect(mapStateToProps)(Stocks);
