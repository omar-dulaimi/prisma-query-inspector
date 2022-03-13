import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { format } from "sql-formatter";
import Header from "./components/Header/Header.lazy";
import Message from "./components/Message/Message.lazy";
import MessageDetails from "./components/MessageDetails/MessageDetails.lazy";
import NoMessages from "./components/NoMessages/NoMessages.lazy";
import { MessageType } from "./types";
import { safeArrayParse } from "./utils";
import "./App.css";
const ENDPOINT = "http://127.0.0.1:5858";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [params, setParams] = useState<MessageType>({});
  const [formattedQuery, setFormattedQuery] = useState<string>("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", (message: MessageType) => {
      messages.push(message);
      setMessages([...messages]);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedMessage) return;
    const formatted: string = format(selectedMessage.query, {
      language: "mysql",
      uppercase: true,
    });
    setFormattedQuery(formatted);
    const parsedParams = safeArrayParse(selectedMessage.params).filter(Boolean);
    const reduced =
      parsedParams.reduce((result: MessageType, current, index) => {
        result[`param${index + 1}`] = current;
        return result;
      }, {}) ?? {};
    setParams(reduced);
  }, [selectedMessage]);

  return (
    <>
      <Header />
      {!messages || messages?.length === 0 ? (
        <NoMessages />
      ) : (
        <div className="main">
          {messages?.length > 0 && (
            <>
              <div className="logs">
                {messages.map((item: MessageType) => (
                  <Message
                    key={item.id}
                    message={item}
                    selectedMessage={selectedMessage}
                    setSelectedMessage={setSelectedMessage}
                  />
                ))}
              </div>
              <div className="details">
                {selectedMessage && (
                  <MessageDetails
                    key={selectedMessage.id}
                    selectedMessage={selectedMessage}
                    formattedQuery={formattedQuery}
                    params={params}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
