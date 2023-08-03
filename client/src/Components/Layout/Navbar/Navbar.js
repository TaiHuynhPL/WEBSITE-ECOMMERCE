import { useSelector, useDispatch } from "react-redux";
import { actionUserLogin } from "../../../store/userlogin";
import { actionListCart } from "../../../store/listCart";
import { actionChat } from "../../../store/chat";
import { disconnectSocket } from "../../../utils/socket";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../../../utils/socket";
import axios from "axios";
import Cookies from "js-cookie";

import classes from "./Navbar.module.css";

function Navbar({ onLogout }) {
  //Lấy giá trị có đang đang nhập và thông tin tài khoản từ state userlogin của redux
  const islogin = useSelector((state) => state.userlogin.isLogin);
  const userlogin = useSelector((state) => state.userlogin.user);
  const chatId = useSelector((state) => state.chat.chatId);

  //tạo hàm dispatch
  const dispatch = useDispatch();

  //sử dụng useNavigate để điều hướng trang
  const navigate = useNavigate();

  //Hàm Logout tài khoản
  const handlerLogout = async () => {
    dispatch(actionUserLogin.on_logout());
    //xóa danh sách giỏ hàng trong localStorage
    localStorage.removeItem("listCart");
    dispatch(actionListCart.reset_cart());
    dispatch(actionChat.off_chat());
    onLogout();
    if (chatId) {
      socket.emit("offchat", chatId);
      await axios.put(`/session/changeNotExist/${chatId}`);
    }
    disconnectSocket();
    Cookies.remove("access_token");
    navigate("../login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.navhomeshop}>
        <Link to="/" className={classes.home}>
          Home
        </Link>
        <Link to="shop" className={classes.shop}>
          Shop
        </Link>
        <Link to="history" className={classes.shop}>
          History
        </Link>
      </div>
      <div className={classes.title}>BOUTIQUE</div>
      <div className={classes.navcartlogin}>
        <div className={classes.cartlogin}>
          <FontAwesomeIcon icon={faCartShopping} />
          <Link to="cart">Cart</Link>
        </div>
        <div className={classes.cartlogin}>
          <FontAwesomeIcon icon={faUser} />
          {!islogin && <Link to="login">Login</Link>}
          {islogin && <span className={classes.name}>{userlogin.name}</span>}
          {islogin && <span className={classes.arrow}>&#x25BC;</span>}
          {islogin && (
            <span className={classes.logout} onClick={handlerLogout}>
              (Logout)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
