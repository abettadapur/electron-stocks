import React from 'react';
import Text from '../../text/Text';
import TextInput from '../../textInput/TextInput';
import styled from 'frontend/styled';
import { MdDateRange } from 'react-icons/md'
import { useTheme } from 'frontend/stocks/ui/theme/Theme';
import SelectInput from '../../selectInput/SelectInput';
import SelectOption from '../../selectInput/SelectOption';

export function AddTransactionModal() {
  const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  });

  const theme = useTheme();

  return (
    <Grid>
      <div>
        <Text textSize="small">Type:</Text>
        <SelectInput>
          <SelectOption>Buy</SelectOption>
          <SelectOption>Sell</SelectOption>
        </SelectInput>
      </div>
      <div>
        <Text textSize="small">Date:</Text>
        <TextInput rightIconProps={{
          icon: MdDateRange,
          color: theme.colors.grey_500
        }}
        />
      </div>
      <div>
        <Text textSize="small">Ticker:</Text>
        <TextInput />
      </div>
      <div>
        <Text textSize="small"># of shares:</Text>
        <TextInput />
      </div>
      <div>
        <Text textSize="small">Share price:</Text>
        <TextInput />
      </div>
    </Grid>
  );
}

AddTransactionModal.title = "Add Transaction";