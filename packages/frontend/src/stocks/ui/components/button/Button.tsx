import React from "react";
import styled from "frontend/styled";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default React.forwardRef<HTMLButtonElement | null, Props>(
  function Button(props, ref) {
    return <button {...props} ref={ref} />;
  }
);
