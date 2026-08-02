import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {

  const { targetUserId } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [targetUser, setTargetUser] = useState(null);
   
  const user = useSelector((store) => store.user);
//   console.log(user)
  const userId = user?._id;
  const firstName = user?.firstName


  const fetchMessages = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/chat/${targetUserId}`,
      {
        withCredentials: true,
      }
    );

    setMessages(res.data.messages);
    setTargetUser(res.data.participant);

  } catch (err) {
    console.log(err);
  }
};


 const handleSend = () => {
  if (!text.trim()) return;
  const messageData = {
    firstName,
    targetUserId,
    userId,
    sender: "me",
    text,
  };

  // Send to Backend
  socket.emit("sendMessage", messageData);

  setText("");
};


  useEffect(() => {

    if (!userId) return;
    fetchMessages();

  socket.connect();
//   console.log(targetUserId)
  socket.emit("joinChat", {firstName, userId, targetUserId});

  const handleReceiveMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

    socket.on("receiveMessage", handleReceiveMessage);

  return () => {
    socket.off("receiveMessage", handleReceiveMessage);
    socket.disconnect();
  };

}, [userId, targetUserId]);

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-100 flex flex-col">

      {/* Header */}

      <div className="bg-white shadow px-6 py-4">
        <div className="flex items-center gap-4">

          <img
            src={targetUser?.profile}
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div>

            <h2 className="font-bold text-lg">
              {targetUser?.firstName} {targetUser?.lastName}
            </h2>

          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {messages.map((message) => (

          <div
            key={message._id}
            className={`flex ${
              message.senderId._id === userId
                ? "justify-end"
                : "justify-start"
            }`}>

            <div
              className={`px-5 py-3 rounded-2xl max-w-sm ${
                message.senderId._id === userId
                  ? "bg-blue-500 text-white"
                  : "bg-white shadow"
              }`}
            >
              {message.text}
            </div>

          </div>

        ))}

      </div>

      {/* Input */}

      <div className="bg-white border-t">

        <div className="max-w-5xl mx-auto flex gap-2">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-2 py-2 m-10 outline-none mb-25"
          />

          <button
            onClick={handleSend}
            className="bg-blue-500 mb-25 m-10 hover:bg-blue-600 text-white px-8 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default Chat;