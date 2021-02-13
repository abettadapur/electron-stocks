import React from "react";
import styled from "../../../../styled";
import View from "../../view/View";
import Watchlist from "../watchlist/Watchlist";
import StockDetails from "../StockDetails/StockDetails";
import SearchBar from '../SearchBar/SearchBar';

const StocksViewContainer = styled(View)({
  flexDirection: "row",
  flex: 1,
});

const LeftContainer = styled(View)({
  flex: "0 0 300px",
});

const RightContainer = styled(View)({
  flex: 1,
});

export default function StocksView() {
  return (
    <StocksViewContainer>
      <LeftContainer>
        <Watchlist></Watchlist>
      </LeftContainer>
      <RightContainer>
        <SearchBar></SearchBar>
        <StockDetails></StockDetails>
      </RightContainer>
    </StocksViewContainer>
  );
}
