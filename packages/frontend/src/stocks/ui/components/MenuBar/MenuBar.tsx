import React from "react";
import MenuBarButton from "./MenuBarButton";
import View from "../../view/View";
import styled from "frontend/styled";
import { connect } from "react-redux";
import { StocksState } from "../../../redux/stocks/Stocks.types";

interface MenuBarProps {
  selected: string;
}

const MenuBarContainer = styled(View)({
  flexDirection: "row",
  height: 50,
});

function MenuBar(props: MenuBarProps) {
  return (
    <MenuBarContainer>
      <MenuBarButton text="Stocks" selected={props.selected === 'Stocks'} />
      <MenuBarButton text="My Finances" selected={props.selected === 'My Finances'} />
    </MenuBarContainer>
  );
}

const mapStateToProps = (state: StocksState) => ({
  selected: state.stocks.menuBar.menuItem
});

export default connect(mapStateToProps)(MenuBar);
