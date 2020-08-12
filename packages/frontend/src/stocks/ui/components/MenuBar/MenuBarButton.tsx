import React, { useContext } from "react";
import styled from "frontend/styled";
import View from "../../view/View";
import { connect } from "react-redux";
import { StocksActions } from '../../../redux/stocks/StocksActions';

type StateProps = {
  selected?: boolean;
  text: string;
}

type DispatchProps = {
  select: (menuItem: string) => void;
}

const MenuButtonContainer = styled(View)<{ selected?: boolean }>((props) => ({
  flex: 1,
  cursor: "default",
  border: `1px solid ${props.theme.colors.black}`,
  backgroundColor: props.selected ? 'gray' : props.theme.colors.white
}));

const MenuButtonText = styled(View)({
  marginTop: 15,
  textAlign: "center",
});

function MenuBarButton(props: StateProps & DispatchProps) {
  const { text } = props;
  return (
    <MenuButtonContainer selected={props.selected} onClick={() => props.select(text)}>
      <MenuButtonText>{text}</MenuButtonText>
    </MenuButtonContainer>
  );
}

const mapStateToProps = (state: any, ownProps: StateProps) => ({
  selected: ownProps.selected,
  text: ownProps.text
});

const mapDispatchToProps = (dispatch: any) => ({
  select: (menuItem: string) => dispatch(StocksActions.menuSelect(menuItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBarButton);