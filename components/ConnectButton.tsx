"use client";

import { useUser } from "libs/hooks/useUser";

export function ConnectButton(props) {
  const { children, className } = props;
  const { login } = useUser();

  return (
    <span
      onClick={() => {
        login();
      }}
      className={className}
    >
      {children}
    </span>
  );
}
