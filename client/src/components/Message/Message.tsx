import React, { Dispatch, FC, SetStateAction } from "react";
import { MessageType } from "../../types";
import "./Message.css";

interface MessageProps {
  message: MessageType;
  selectedMessage: MessageType | null;
  setSelectedMessage: Dispatch<SetStateAction<MessageType | null>>;
}

const Message: FC<MessageProps> = ({
  message,
  selectedMessage,
  setSelectedMessage,
}) => (
  <div
    className={
      selectedMessage?.id === message.id ? "message selected" : "message"
    }
    onClick={() => {
      setSelectedMessage(message);
    }}
  >
    <div>id: {message.id}</div>
    <div>duration: {message.duration}ms</div>
  </div>
);

export default Message;
