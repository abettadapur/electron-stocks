import React from 'react';
import styled from "../../../../styled";
import View from "../../view/View";
import { connect } from "react-redux";
import { StocksAwareState, Period } from 'frontend/stocks/redux/stocks/Stocks.types';
import { StocksActions } from 'frontend/stocks/redux/stocks/StocksActions';

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

const HistoricalPeriodButton = styled.button({
  textAlign: 'center',
  flex: 1
});

function HistoricalPeriodButtons(props: Props) {
  const { periods, setSelectedPeriod } = props;
  return (
    <View>
      <HistoricalPeriodSelector>
        {
          periods.map((period) => <HistoricalPeriodButton onClick={() => setSelectedPeriod(period)}>{period.toUpperCase()}</HistoricalPeriodButton>)
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