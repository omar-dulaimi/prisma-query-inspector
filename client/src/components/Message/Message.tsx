import React, { Dispatch, FC, SetStateAction } from "react";
import { MessageType } from "../../types";
import "./Message.css";

interface MessageProps {
  message: MessageType;
  selectedMessage: MessageType | null;
  setSelectedMessage: Dispatch<SetStateAction<MessageType | null>>;
  MessageDetails: React.ReactNode;
  size: {
    width: number | undefined;
    height: number | undefined;
  };
}

const Message: FC<MessageProps> = ({
  message,
  selectedMessage,
  setSelectedMessage,
  MessageDetails,
  size,
}) => (
  <>
    <div
      className={
        selectedMessage?.id === message.id ? "message selected" : "message"
      }
      onClick={() => {
        setSelectedMessage(message ? message : null);
      }}
    >
      <div>id: {message.id}</div>
      <div>duration: {message.duration}ms</div>
    </div>

    {(size.width as number) <= 700 &&
      selectedMessage?.id === message.id &&
      MessageDetails}
  </>
);

export default Message;
