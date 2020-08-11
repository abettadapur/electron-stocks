import React from 'react';
import MenuBarButton from './MenuBarButton';

export default function MenuBar() {
  return (
    <div style={flexRow}>
      <MenuBarButton text='Stocks' />
      <MenuBarButton text='My Finances' />
    </div>
  )
}

const flexRow = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  height: 50
};