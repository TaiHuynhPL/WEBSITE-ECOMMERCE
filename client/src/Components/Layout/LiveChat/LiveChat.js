import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faFaceSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { actionChat } from "../../../store/chat";
import { socket } from "../../../utils/socket";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import Cookies from "js-cookie";

import classes from "./LiveChat.module.css";
import { useState } from "react";

function LiveChat({ offChat }) {
  const user = useSelector((state) => state.userlogin.user);
  const isChatting = useSelector((state) => state.chat.isChatting);
  const chatId = useSelector((state) => state.chat.chatId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (isChatting) {
      const getMessages = async () => {
        const { data } = await axios.get(`/session/getSessionById/${chatId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setMessages(data.messages);
      };
      getMessages();
    }
  }, []);

  const handleSend = async () => {
    if (message === "/end") {
      dispatch(actionChat.off_chat());
      if (chatId) {
        socket.emit("offchat", chatId);
        await axios.put(`/session/changeNotExist/${chatId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      offChat();
      setMessage("");
    } else {
      if (isChatting || user.roomId) {
        const { data } = await axios.post(
          "/message/create",
          {
            sender: user.id,
            text: message,
            chatId: chatId || user.roomId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        socket.emit("newMessage", data);
        setMessage("");
      } else {
        const { data: chat } = await axios.post(
          "/session/create",
          {
            userId: user.id,
            messageId: message,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        socket.emit("newRoomChat", chat._id);
        dispatch(actionChat.on_chat(chat._id));

        const { data } = await axios.post(
          "/message/create",
          {
            sender: user.id,
            text: message,
            chatId: chat._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        socket.emit("newMessage", data);
        setMessage("");
      }
    }
  };

  useEffect(() => {
    socket.on("getMessage", ({ userId, message, chatId }) => {
      setArrivalMessage({
        sender: userId,
        text: message,
        chatId: chatId,
      });
      dispatch(actionChat.on_chat(chatId));
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={classes.livechatContainer}>
      <div className={classes.title}>
        <h5>Custommer Support</h5>
        <p className={classes.titlename}>Let's Chat App</p>
      </div>
      <ScrollableFeed>
        <div className={classes.content}>
          {messages.length > 0 &&
            messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.sender === user.id
                    ? classes.chatUserContainer
                    : classes.chatAdminContainer
                }
              >
                <p
                  className={
                    m.sender === user.id ? classes.chatUser : classes.chatAdmin
                  }
                >
                  {m.text}
                </p>
              </div>
            ))}
        </div>
      </ScrollableFeed>
      <div className={classes.livechatFooter}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message!"
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon icon={faPaperclip} className={classes.faPaperclip} />
        <FontAwesomeIcon icon={faFaceSmile} className={classes.faFaceSmile} />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={classes.faPaperPlane}
          onClick={handleSend}
        />
      </div>
    </div>
  );
}

export default LiveChat;
