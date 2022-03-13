import { FC } from "react";
import "./NoMessages.css";

interface NoMessagesProps {}

const NoMessages: FC<NoMessagesProps> = () => (
  <div className="no-messages">
    <blockquote>No queries to show</blockquote>
  </div>
);

export default NoMessages;
