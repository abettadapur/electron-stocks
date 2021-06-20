import React from "react";
import styled from "../../../../styled";
import View from "../../view/View";
import FavoritedStocks from "../FavoritedStocks/FavoritedStocks";
import StockDetails from "../StockDetails/StockDetails";
import ModalContainer from "../ModalContainer/ModalContainer";

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
      <ModalContainer></ModalContainer>
      <LeftContainer>
        <FavoritedStocks></FavoritedStocks>
      </LeftContainer>
      <RightContainer>
        <StockDetails></StockDetails>
      </RightContainer>
    </StocksViewContainer>
  );
}
