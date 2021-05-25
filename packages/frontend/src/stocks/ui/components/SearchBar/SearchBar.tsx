import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "../../../../styled";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";

type Props = typeof Actions;

const SearchContainer = styled.div({
  textAlign: "end",
});

function SearchBar(props: Props) {
  const { setSelectedStock } = props;

  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContainer>
      <input
        placeholder="Search.."
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <button onClick={() => setSelectedStock(searchValue)}>Search</button>
    </SearchContainer>
  );
}

const Actions = {
  setSelectedStock: StocksActions.setSelectedStock,
};

export default connect(null, Actions)(SearchBar);
