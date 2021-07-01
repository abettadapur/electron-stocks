import React from "react";
import Text from "../text/Text";
import styled from "frontend/styled";
import { connect } from "react-redux";
import { StocksAwareState } from "frontend/stocks/redux/stocks/Stocks.types";
import Modals, { ModalType } from "../Modals";
import { MdClose } from "react-icons/md";
import IconButton from "../button/IconButton";
import { StocksActions } from "frontend/stocks/redux/stocks/StocksActions";

type Props = {
  modal: ModalType | null;
};

function ModalContainer(props: Props & typeof Actions) {
  const ModalWrapper = styled.div<{ modal?: string }>((props) => ({
    position: "fixed",
    zIndex: 100,
    backgroundColor: props.theme.colors.grey_700,
    top: "25%",
    left: "25%",
    height: "50%",
    borderRadius: 10,
  }));

  const CloseWrapper = styled.div({});

  const TitleBar = styled.div({
    display: "flex",
    flexDirection: "row",
    padding: 5,
  });

  const TitleWrapper = styled.div({
    flexGrow: 1,
  });

  const ModalContent = styled.div({
    padding: "0px 5px 0px 5px",
  });

  const Line = styled.hr((props) => ({
    borderColor: props.theme.colors.grey_500,
  }));

  const { modal, closeModal } = props;
  if (!modal) {
    return null;
  }

  const ActiveModal = Modals[modal];
  return (
    <ModalWrapper modal={modal}>
      <TitleBar>
        <TitleWrapper>
          <Text textSize="large">{modal && Modals[modal].title}</Text>
        </TitleWrapper>
        <CloseWrapper>
          <IconButton icon={MdClose} size="small" onClick={closeModal} />
        </CloseWrapper>
      </TitleBar>
      <Line />
      <ModalContent>
        <ActiveModal />
      </ModalContent>
    </ModalWrapper>
  );
}

function mapStateToProps(state: StocksAwareState) {
  return {
    modal: state.stocks.activeModal,
  };
}

const Actions = {
  closeModal: StocksActions.closeModal,
};

export default connect(mapStateToProps, Actions)(ModalContainer);
