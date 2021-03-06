import React, { Dispatch, lazy, SetStateAction, Suspense } from "react";
import { MessageType } from "../../types";

const LazyMessage = lazy(() => import("./Message"));

const Message = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & {
    message: MessageType;
    selectedMessage: MessageType | null;
    setSelectedMessage: Dispatch<SetStateAction<MessageType | null>>;
    MessageDetails: React.ReactNode;
    size: {
      width: number | undefined;
      height: number | undefined;
    };
  }
) => (
  <Suspense fallback={null}>
    <LazyMessage {...props} />
  </Suspense>
);

export default Message;
