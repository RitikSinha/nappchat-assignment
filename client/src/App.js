import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { AuthContext } from "./context/AuthContex";
import axios from "axios";
import { baseUrl } from "./helper/base";
import { io } from "socket.io-client";

function App() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return navigate("/login");
  });
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${baseUrl}/conversations/` + user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);
  const signOut = (e) => {
    console.log("clicked");
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const getAllusers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/all`);
        const all = res.data.filter((u) => user?._id !== u._id);
        setAllusers(all);
      } catch (err) {
        console.log(err);
      }
    };
    getAllusers();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/messages/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${baseUrl}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  //start conversation
  const handleConversation = async (e, friend) => {
    e.preventDefault();
    const conversation = {
      senderId: user._id,
      receiverId: friend._id,
    };
    try {
      const res = await axios.post(`${baseUrl}/conversations`, conversation);
      setConversations([...conversations, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/4 bg-slate-100 h-full">
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Card conversation={c} currentUser={user} />
            </div>
          ))}
          <button
            className=" fixed bottom-0 btn-accent btn-md mb-5 "
            onClick={signOut}
          >
            logout
          </button>
        </div>
        <div className="w-3/4 pb-32">
          {currentChat ? (
            <>
              <div className="m-5" ref={scrollRef}>
                {messages.map((m) => (
                  <div
                    className={
                      m.sender === user._id
                        ? "chat chat-end"
                        : "chat chat-start"
                    }
                  >
                    <div className="chat-bubble chat-bubble-primary">
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className=" fixed bottom-0 p-5 w-full flex items-center bg-slate-200">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-lg w-1/3 "
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn btn-primary ml-5">
                  send
                </button>
              </div>
            </>
          ) : (
            <h1 className="text-3xl text-center">
              {" "}
              No chats. Say hi to your friends!
            </h1>
          )}
        </div>
        <div className="w-1/3 bg-slate-200 p-2">
          <h1 className="text-2xl">All Users</h1>
          {allusers.map((c) => (
            <h1 onClick={(e) => handleConversation(e, c)}>{c.username}</h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
