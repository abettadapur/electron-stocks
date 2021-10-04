import React from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import { connect } from "react-redux";
import { StocksAwareState } from "../redux/stocks/Stocks.types";
import StocksView from "./components/stocksView/StocksView";
import View from "./view/View";
import styled from "frontend/styled";

const StocksContainer = styled(View)((props) => ({
  backgroundColor: props.theme.semanticColors.background,
  flex: 1,
}));

function Stocks(props: { menuItem: string }) {
  return (
    <StocksContainer>
      {props.menuItem === "stocks" && <StocksView />}
    </StocksContainer>
  );
}

const mapStateToProps = (state: StocksAwareState) => ({
  menuItem: state.stocks.menuBar.menuItem,
});

export default connect(mapStateToProps)(Stocks);
