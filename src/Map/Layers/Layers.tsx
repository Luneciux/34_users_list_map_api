import { ReactNode } from "react";

type LayersProps = {
  children: ReactNode;
};

export const Layers = ({ children }: LayersProps) => {
  return <div>{children}</div>;
};
