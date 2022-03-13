import { FC } from "react";
import ReactJson from "react-json-view";
import { MessageType } from "../../types";
import "./MessageDetails.css";

interface MessageProps {
  selectedMessage: MessageType;
  formattedQuery: string;
  params: MessageType;
}

const Message: FC<MessageProps> = ({
  selectedMessage,
  formattedQuery,
  params,
}) => (
  <div className="message-details">
    <div>id: {selectedMessage.id}</div>
    <div>duration: {selectedMessage.duration}ms</div>
    <div>
      <p>query</p>
      <blockquote>
        <pre>{formattedQuery}</pre>
      </blockquote>
    </div>
    <div>
      <p>params</p>
      <blockquote>
        <ReactJson
          src={params}
          name={null}
          theme={"codeschool"}
          displayDataTypes={false}
        />
      </blockquote>
    </div>
  </div>
);

export default Message;
