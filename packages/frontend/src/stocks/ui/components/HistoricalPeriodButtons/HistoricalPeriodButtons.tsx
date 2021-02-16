import React from 'react';
import styled from "../../../../styled";
import View from "../../view/View";
import { connect } from "react-redux";
import { StocksAwareState, Period } from 'frontend/stocks/redux/stocks/Stocks.types';
import { StocksActions } from 'frontend/stocks/redux/stocks/StocksActions';
import Pivot from '../../pivot/Pivot';

type MappedProps = {
  selectedPeriod: Period;
}

type PassedProps = {
  periods: Period[];
}

type Props = MappedProps & PassedProps & typeof Actions;

const HistoricalPeriodSelector = styled(View)({
  flexDirection: 'row'
});

function HistoricalPeriodButtons(props: Props) {
  const { periods, setSelectedPeriod, selectedPeriod } = props;
  const pivotItems = periods.map(period => { return { key: period, title: period }; })
  return (
    <View>
      <HistoricalPeriodSelector>
        {
          <Pivot pivotItems={pivotItems} selectedKey={selectedPeriod} onItemSelected={(key) => setSelectedPeriod(key as Period)} />
        }
      </HistoricalPeriodSelector>
    </View>
  );
}

const Actions = {
  setSelectedPeriod: StocksActions.setSelectedPeriod
};

function mapStateToProps(state: StocksAwareState): MappedProps {
  return {
    selectedPeriod: state.stocks.selectedPeriod
  };
}

export default connect(mapStateToProps, Actions)(HistoricalPeriodButtons);