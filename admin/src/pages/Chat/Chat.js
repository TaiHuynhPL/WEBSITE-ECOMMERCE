import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../utils/socket";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./Chat.module.css";

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const [searchInput, setSearchInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [client, setClient] = useState();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getAllChatExist = async () => {
      const { data } = await axios.get("/session/getAllSessionExist", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const newData = data
        .filter((chat) => chat._id.includes(searchInput.trim()))
        .sort(
          (a, b) =>
            new Date(b.messages[b.messages.length - 1].createdAt) -
            new Date(a.messages[a.messages.length - 1].createdAt)
        );

      setChats(newData);
    };
    getAllChatExist();
  }, [searchInput, selectedChat, arrivalMessage]);

  useLayoutEffect(() => {
    if (chats.length > 0 && selectedChat) {
      const message = chats
        .find((chat) => chat._id === selectedChat)
        ?.messages.map((m) => ({ sender: m.sender, text: m.text }));
      setMessages(message);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.emit("adminJoinRoomsAvailble");
  }, []);

  useEffect(() => {
    socket.on("getMessage", ({ userId, message, chatId }) => {
      setArrivalMessage({
        sender: userId,
        text: message,
        chatId: chatId,
      });
    });

    socket.on("userCreateRoom", (chatId) => {
      socket.emit("adminJoinRoom", chatId);
    });

    socket.on("closeChat", (chatId) => {
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
      socket.emit("adminOutRoomChat", chatId);
      setSelectedChat("");
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.chatId === selectedChat &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleChatUser = ({ id, clientId }) => {
    setSelectedChat(id);
    setClient(clientId);
  };

  const handleSend = async () => {
    const { data } = await axios.post(
      "/message/create",
      {
        sender: user.id,
        text: message,
        chatId: selectedChat,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    socket.emit("newMessage", data);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={classes.chatContainer}>
      <h2 className={classes.title}>Chat</h2>
      <p>Apps / Chat</p>
      <div className={classes.contentContainer}>
        <div className={classes.sidebar}>
          <div className={classes.searchInput}>
            <input
              placeholder="Search Contact"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className={classes.listChat}>
            {chats.length > 0 &&
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={
                    chat._id === selectedChat
                      ? classes.listActive
                      : classes.listUser
                  }
                  onClick={(e) =>
                    handleChatUser({ id: chat._id, clientId: chat.user[0]._id })
                  }
                >
                  <div className={classes.userIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>

                  <div>{chat._id}</div>
                </div>
              ))}
          </div>
        </div>
        <div className={classes.message}>
          {chats.length > 0 && selectedChat !== "" && messages ? (
            <ScrollableFeed>
              <div className={classes.content}>
                {messages.length > 0 &&
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={
                        m.sender === user.id
                          ? classes.chatAdminContainer
                          : classes.chatUserContainer
                      }
                    >
                      <p
                        className={
                          m.sender === user.id
                            ? classes.chatAdmin
                            : classes.chatUser
                        }
                      >
                        {m.sender === client
                          ? `Client: ${m.text}`
                          : m.sender === user.id
                          ? `You: ${m.text}`
                          : `Admin: ${m.text}`}
                      </p>
                    </div>
                  ))}
              </div>
            </ScrollableFeed>
          ) : (
            <div className={classes.noneChat}>
              Click on a user to start chatting
            </div>
          )}
          <div className={classes.messageInput}>
            <input
              placeholder="Type and enter"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={selectedChat === ""}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.send}
              onClick={handleSend}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
