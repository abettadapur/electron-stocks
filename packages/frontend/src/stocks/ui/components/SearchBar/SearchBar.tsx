import React, { useState } from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import TextInput from "../textInput/TextInput";
import { MdSearch } from "react-icons/md";
import { useTheme } from "../../theme/Theme";

type Props = typeof Actions;

function SearchBar(props: Props) {
  const { setSelectedStock } = props;

  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  return (
    <TextInput
      placeholder="Search.."
      value={searchValue}
      onChange={(e) => setSearchValue(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSelectedStock(searchValue);
        }
      }}
      rightIconProps={{
        icon: MdSearch,
        color: theme.colors.grey_500,
      }}
    />
  );
}

const Actions = {
  setSelectedStock: StocksActions.setSelectedStock,
};

export default connect(null, Actions)(SearchBar);
