import React from 'react';



interface MenuBarButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MenuBarButton(props: MenuBarButtonProps) {
  const { text } = props;
  return (
    <div style={menuButton}>
      <div style={center}>
        {text}
      </div>
    </div>
  );
}

const menuButton = {
  flex: 1,
  height: '100%',
  cursor: 'default',
  border: '1px solid black'
};

const center = {
  marginTop: 15,
  textAlign: 'center' as 'center' // type error if I don't cast it?
};