import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionAuth } from "../../../store/auth";
import { disconnectSocket } from "../../../utils/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./Navbar.module.css";

function Navbar() {
  const islogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <div className={classes.navhomeshop}></div>
      <div className={classes.title}>BOUTIQUE</div>
      <div className={classes.navcartlogin}>
        <div className={classes.cartlogin}>
          <FontAwesomeIcon icon={faUser} />
          {!islogin && <Link to="login">Login</Link>}
          {islogin && <span className={classes.name}>{user.name}</span>}
          {islogin && <span className={classes.arrow}>&#x25BC;</span>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
