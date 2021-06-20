import React, { ReactNode, useState } from 'react';
import Text from '../text/Text'
import styled from "frontend/styled";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import IconButton from '../button/IconButton';

type Props = {
  text: string;
  children: ReactNode;
}

const ChildWrapper = styled.div<{ open: boolean }>((props) => ({
  height: props.open ? 'auto' : '0px',
  overflow: 'hidden',
  paddingTop: 5
}));

const TitleBar = styled.div({
  paddingTop: 5,
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: 5
});

const TitleWrap = styled.div({
  flexGrow: 1
})

export default function Collapsible(props: Props) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <TitleBar>
        <TitleWrap>
          <Text textSize="large">{props.text}</Text>
        </TitleWrap>
        <IconButton
          icon={open ? MdKeyboardArrowUp : MdKeyboardArrowDown}
          size="medium"
          onClick={() => setOpen(!open)}
        />
      </TitleBar>
      <ChildWrapper open={open}>
        {props.children}
      </ChildWrapper>
      <hr />
    </div>
  );
}