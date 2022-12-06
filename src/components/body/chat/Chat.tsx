import { useEffect, useState } from "react";

interface chatProps {
  socket: any;
  username: string;
}

const Chat: React.FC<chatProps> = ({ socket, username }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<string[] | void>([]);

  const sendMessage = async () => {
    if (message !== "") {
      const data = {
        message: message,
        sender: username,
        time: new Date().toLocaleTimeString(),
      };
      await socket.emit("send_message", data);
      setMessageList((messageList:any) => [...messageList, data]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
        setMessageList((messageList:any) => [...messageList, data]);
    });
  }, [socket]);

  return (
    <div className="container mx-auto flex flex-col justify-between min-h-[90vh] h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-scroll">
          {messageList?.map((message: any, index: number) => {
            return (
              <div key={index} className={`chat ${message.sender === username ? "chat-start": "chat-end"}`}>
                <div className="chat-header">
                  {message.sender},
                  <time className="pl-1 text-xs opacity-50">{message.time}</time>
                </div>
                <div className="chat-bubble">{message.message}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex">
        <div className="relative min-w-[85vw]">
          <textarea
            placeholder="Type your message here..."
            className="p-4 border-2 rounded w-full h-32 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-primary absolute right-2 bottom-4 h-8 min-h-0 px-14 py-0 text-xs"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
