"use client"; // Error components must be Client components

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="p-4">
      <h2>Something went wrong! We have been notified and will work on a fix ASAP.</h2>
      <p>Error: {error?.message}</p>
      <p>Stack: {error?.stack}</p>
    </div>
  );
}
