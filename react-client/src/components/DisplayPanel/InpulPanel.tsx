import React from "react";

type Props = {
  children: React.ReactNode;
};

const InputPanel: React.FC<Props> = ({ children }) => {
  return <div className="input-panel">{children}</div>;
};

export default InputPanel;

