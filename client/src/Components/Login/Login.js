import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionUserLogin } from "../../store/userlogin";
import { connectSocket } from "../../utils/socket";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import classes from "./Login.module.css";

function Login() {
  const [info, setInfo] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", info);
      if (res.status === 200) {
        dispatch(actionUserLogin.on_login(res.data));
        connectSocket();
        Cookies.set("access_token", res.data.token, {
          expires: 1,
        });
        toast.success("Login Successfullly!");
        navigate("..");
      }
    } catch (error) {}
  };

  return (
    <div className={classes.login}>
      <div className={classes.banner}>
        <div className={classes.signup}>
          <h4>Sign In</h4>
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
}

export default Login;
