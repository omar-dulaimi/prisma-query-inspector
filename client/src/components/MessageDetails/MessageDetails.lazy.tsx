import React, { lazy, Suspense } from "react";
import { MessageType } from "../../types";

const LazyMessage = lazy(() => import("./MessageDetails"));

const Message = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & {
    selectedMessage: MessageType;
    formattedQuery: string;
    params: MessageType;
  }
) => (
  <Suspense fallback={null}>
    <LazyMessage {...props} />
  </Suspense>
);

export default Message;
