import { ReactElement } from "react";

type ConditonalWrapperProps = {
  children: ReactElement;
  condition: boolean;
  wrapper: (children: ReactElement) => JSX.Element;
};

export const ConditonalWrapper = ({ condition, wrapper, children }: ConditonalWrapperProps) => {
  return condition ? wrapper(children) : children;
};
