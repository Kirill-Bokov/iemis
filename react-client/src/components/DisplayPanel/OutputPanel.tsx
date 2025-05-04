import React from "react";

type Props<T> = {
  data: T;
  render: (data: T) => React.ReactNode;
};

const OutputPanel = <T extends object>({ data, render }: Props<T>) => {
  return <div className="output-panel">{render(data)}</div>;
};

export default OutputPanel;
