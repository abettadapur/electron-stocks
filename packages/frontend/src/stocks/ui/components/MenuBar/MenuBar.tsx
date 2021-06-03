import React from "react";
import { connect } from "react-redux";
import { StocksAwareState } from "../../../redux/stocks/Stocks.types";
import Pivot from "../../pivot/Pivot";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";

type MappedProps = {
  selected: string;
};

type Props = MappedProps & typeof Actions;

function MenuBar(props: Props) {
  const { selectItem, selected } = props;

  return (
    <Pivot
      pivotItems={[
        { key: "stocks", title: "Watchlist" },
        { key: "finances", title: "My Portfolio" },
      ]}
      selectedKey={selected}
      onItemSelected={(key) => selectItem(key)}
    />
  );
}

const mapStateToProps = (state: StocksAwareState): MappedProps => ({
  selected: state.stocks.menuBar.menuItem,
});

const Actions = {
  selectItem: StocksActions.menuSelect,
};

export default connect(mapStateToProps, Actions)(MenuBar);
