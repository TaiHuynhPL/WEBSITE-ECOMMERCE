import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import LiveChat from "./LiveChat/LiveChat";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";
import { socket, connectSocket } from "../../utils/socket";

//Component Layout
function Layout() {
  const { isLogin } = useSelector((state) => state.userlogin);
  const { chatId } = useSelector((state) => state.chat);

  if (isLogin && !socket) {
    connectSocket();
    socket.emit("joinRoom", chatId);
  }

  //tạo state để thay đổi việc ẩn hiển LiveChat
  const [isShowLiveChat, setIsShowLiveChat] = useState(false);

  //Hàm khi click vào icon livechat
  const handlerShowChat = () => {
    setIsShowLiveChat((prestate) => !prestate);
  };

  const handleOffChat = () => {
    setIsShowLiveChat(false);
  };

  return (
    <div>
      <Navbar onLogout={handleOffChat} />
      <ToastContainer
        position="top-right"
        autoClose={750}
        pauseOnFocusLoss
        theme="light"
      />
      <Outlet />

      {isShowLiveChat && <LiveChat offChat={handleOffChat} />}
      {isLogin && (
        <FontAwesomeIcon
          icon={faMessage}
          className={classes.message}
          onClick={handlerShowChat}
        />
      )}
      <Footer />
    </div>
  );
}

export default Layout;
