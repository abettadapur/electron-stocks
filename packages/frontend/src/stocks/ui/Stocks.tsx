import React, { useContext } from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import { connect } from "react-redux";
import { StocksState, StocksAwareState } from "../redux/stocks/Stocks.types";
import StocksView from "./components/stocksView/StocksView";
import View from "./view/View";
import { ThemeContext } from "@emotion/core";
import styled from "../../styled";

const StocksViewWrapper = styled(View)<{ theme: any }>(props => ({
  flex: 1,
  background: props.theme.colors.background,
  color: props.theme.colors.fontColor
}));

function Stocks(props: { menuItem: string }) {
  const currentTheme = useContext(ThemeContext);
  return (
    <StocksViewWrapper theme={currentTheme}>
      <MenuBar />
      {props.menuItem === "stocks" && <StocksView />}
    </StocksViewWrapper>
  );
}

const mapStateToProps = (state: StocksAwareState) => ({
  menuItem: state.stocks.menuBar.menuItem,
});

export default connect(mapStateToProps)(Stocks);
