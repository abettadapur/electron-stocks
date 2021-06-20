import React from "react";
import { connect } from "react-redux";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";
import Button from "../button/Button";
import PrimaryButton from "../button/PrimaryButton";
import styled from 'frontend/styled';

function MenuBar(props: typeof Actions) {
  const { openModal } = props;

  const ButtonWrapper = styled.div({
    marginLeft: 'auto',
    padding: 5
  });

  return (
    <ButtonWrapper>
      <PrimaryButton onClick={() => openModal("AddTransactionModal")} size={"small"}>
        Add Transaction
      </PrimaryButton>
    </ButtonWrapper>
  );
}

const Actions = {
  openModal: StocksActions.openModal
}

export default connect(null, Actions)(MenuBar);
