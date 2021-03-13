import React from "react";
import styled from "../../../../styled";
import View from "../../view/View";
import Watchlist from "../watchlist/Watchlist";
import StockDetails from "../StockDetails/StockDetails";
import SearchBar from '../SearchBar/SearchBar';
import { useContext } from 'react';
import { ThemeContext } from "@emotion/core";

const StocksViewContainer = styled(View)({
  flexDirection: "row",
  flex: 1
});

const LeftContainer = styled(View)<{ theme: any }>(props => ({
  flex: "0 0 300px",
  background: props.theme.background,
  color: props.theme.fontColor
}));

const RightContainer = styled(View)<{ theme: any }>(props => ({
  flex: 1,
  background: props.theme.background,
  color: props.theme.fontColor
}));

export default function StocksView() {
  const currentTheme = useContext(ThemeContext);
  return (
    <StocksViewContainer>
      <LeftContainer theme={currentTheme.colors.watchlist}>
        <Watchlist></Watchlist>
      </LeftContainer>
      <RightContainer theme={currentTheme.colors.stockDetails}>
        <SearchBar></SearchBar>
        <StockDetails></StockDetails>
      </RightContainer>
    </StocksViewContainer>
  );
}
