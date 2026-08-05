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
  <div className="h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">

    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">

      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center gap-4">

        <img
          src={targetUser?.profile}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
        />

        <div>

          <h2 className="text-lg font-bold text-slate-800">
            {targetUser?.firstName} {targetUser?.lastName}
          </h2>

          <div className="flex items-center gap-2 mt-1">

            {/* <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> */}

            {/* <span className="text-sm text-slate-500">
              Online
            </span> */}

          </div>

        </div>

      </div>

    </div>

    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-5">

        {messages.length === 0 ? (

          <div className="flex flex-col items-center justify-center h-full text-center mt-20">

            <div className="text-6xl mb-4">
              💬
            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              Start the Conversation
            </h2>

            <p className="mt-2 text-slate-500">
              Say hello and begin chatting.
            </p>

          </div>

        ) : (

          messages.map((message) => (

            <div
              key={message._id}
              className={`flex ${
                message.senderId._id === userId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`px-5 py-3 rounded-[24px] max-w-xs sm:max-w-sm md:max-w-md break-words shadow-sm ${
                  message.senderId._id === userId
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "bg-white border border-slate-200 text-slate-800"
                }`}
              >

                {message.text}

              </div>

            </div>

          ))

        )}

      </div>

    </div>


    <div className="bg-white border-t border-slate-200">

      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-slate-200 bg-slate-100 px-6 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
        />

        <button
          onClick={handleSend}
          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          💬 Send
        </button>

      </div>
    </div>
  </div>
);
};

export default Chat;