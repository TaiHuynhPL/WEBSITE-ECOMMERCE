import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionAuth } from "../../store/auth";
import { connectSocket } from "../../utils/socket";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import classes from "./Login.module.css";

const Login = () => {
  const [info, setInfo] = useState({});
  const [messageErr, setMessageErr] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/admin/login", info);
      dispatch(actionAuth.on_login(res.data));
      connectSocket();
      Cookies.set("access_token", res.data.token, { expires: 1 });
      toast.success("Login Successfullly!");
      navigate("..");
    } catch (error) {
      setMessageErr(error.response.data.message);
    }
  };
  return (
    <div className={classes.login}>
      <div className={classes.banner}>
        <div className={classes.signup}>
          <h4>Sign In With Admin</h4>
          <form className={classes.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={classes.input}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className={classes.input}
              onChange={handleChange}
            />
            {messageErr && <p style={{ color: "red" }}>{messageErr}</p>}
            <button className={classes.btnSignup} onClick={handlerLogin}>
              SIGN IN
            </button>
          </form>
          <p className={classes.loginclick}>
            Create an account?
            <Link to="../register" className={classes.click}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
