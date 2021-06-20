import React from 'react';
import Text from '../text/Text';
import styled from 'frontend/styled';
import { connect } from 'react-redux';
import { StocksAwareState } from 'frontend/stocks/redux/stocks/Stocks.types';
import Modals from '../Modals';
import { MdClose } from "react-icons/md";
import IconButton from '../button/IconButton';
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";

type Props = {
  modal?: string;
}

function ModalContainer(props: Props & typeof Actions) {
  const ModalWrapper = styled.div<{ modal?: string }>((props) => ({
    display: props.modal ? 'block' : 'none',
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'gray',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    borderRadius: 10
  }));

  const CloseWrapper = styled.div({
  });

  const TitleBar = styled.div({
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  });

  const TitleWrapper = styled.div({
    flexGrow: 1
  });

  const ModalContent = styled.div({
    padding: 10
  });

  const { modal, closeModal } = props;

  return (
    <ModalWrapper modal={modal}>
      <TitleBar>
        <TitleWrapper>
          <Text textSize="large">{modal && Modals[modal].title}</Text>
        </TitleWrapper>
        <CloseWrapper>
          <IconButton
            icon={MdClose}
            size="small"
            onClick={closeModal}
          />
        </CloseWrapper>
      </TitleBar>
      <hr />
      <ModalContent>
        {
          modal &&
          Modals[modal]()
        }
      </ModalContent>
    </ModalWrapper >
  )
}

function mapStateToProps(state: StocksAwareState) {
  return {
    modal: state.stocks.activeModal
  }
}

const Actions = {
  closeModal: StocksActions.closeModal
}

export default connect(mapStateToProps, Actions)(ModalContainer);