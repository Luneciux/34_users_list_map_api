import { ReactNode } from "react";

type ControlsProps = {
  children: ReactNode;
};

export const Controls = ({ children }: ControlsProps) => {
  return <div>{children}</div>;
};