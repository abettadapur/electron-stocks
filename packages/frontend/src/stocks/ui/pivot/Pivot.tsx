import React, { useCallback, useEffect, useRef, useState } from "react";
import View from "../view/View";
import styled from "../../../styled";

type PivotItem = {
  key: string;
  title: string;
};

type Props = {
  selectedKey: string;
  pivotItems: PivotItem[];
  onItemSelected?: (key: string) => void;
};

const PivotItemContainer = styled(View)({
  flexDirection: "row",
});

const SelectedPivotItem = styled(View)({
  position: "absolute",
  bottom: 3,
  left: 0,
  height: 2,
  backgroundColor: "blue",
  transition: "transform linear 100ms",
});

export default function Pivot(props: Props) {
  const pivotItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [
    selectedBarStyles,
    setSelectedBarStyles,
  ] = useState<React.CSSProperties | null>(null);
  const { pivotItems, onItemSelected, selectedKey } = props;
  const onPivotItemClicked = useCallback(
    (itemKey: string) => {
      onItemSelected && onItemSelected(itemKey);
    },
    [onItemSelected]
  );

  useEffect(() => {
    const pivotItemElement = pivotItemRefs.current[selectedKey];
    if (pivotItemElement) {
      const width = pivotItemElement.clientWidth;
      const left = pivotItemElement.offsetLeft;
      const transform = `translateX(${left - 1}px)`;
      setSelectedBarStyles({ width, transform });
    }
  }, [selectedKey]);

  return (
    <PivotItemContainer>
      {pivotItems.map((item) => (
        <PaddedPivotItem
          ref={(element) => (pivotItemRefs.current[item.key] = element)}
          onItemClick={onPivotItemClicked}
          itemKey={item.key}
          title={item.title}
        />
      ))}
      {selectedBarStyles && <SelectedPivotItem style={selectedBarStyles} />}
    </PivotItemContainer>
  );
}

type PivotItemProps = React.HTMLAttributes<HTMLDivElement> & {
  itemKey: string;
  title: string;
  onItemClick: (key: string) => void;
};

const PivotItem = React.forwardRef(function PivotItem(
  props: PivotItemProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { itemKey, title, onItemClick, ...rest } = props;

  const _onClick = useCallback(() => {
    onItemClick(itemKey);
  }, [itemKey]);

  return (
    <View ref={ref} {...rest} onClick={_onClick}>
      {title}
    </View>
  );
});

const PaddedPivotItem = styled(PivotItem)({
  margin: 8,
});
