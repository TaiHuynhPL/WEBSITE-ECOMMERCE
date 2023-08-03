import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./Register.module.css";

function Register() {
  const [info, setInfo] = useState({});
  const [messageErr, setMessageErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlersubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", info);
      if (res.status === 200) {
        setMessageErr(null);
        navigate("/login");
      }
    } catch (error) {
      setMessageErr(error.response.data.message);
    }
  };

  return (
    <div className={classes.register}>
      <div className={classes.banner}>
        <div className={classes.signup}>
          <h4>Sign Up</h4>
          <form className={classes.inputContainer}>
            <input
              type="text"
              placeholder="Full Name"
              className={classes.input}
              name="fullname"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className={classes.input}
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className={classes.input}
              name="password"
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Phone"
              className={classes.input}
              name="phone"
              onChange={handleChange}
            />
            <label htmlFor="role" className={classes.roleLabel}>
              Role:
            </label>
            <div className={classes.roleInput}>
              <div>
                <input
                  type="radio"
                  name="role"
                  value="User"
                  defaultChecked
                  onChange={handleChange}
                />
                <label>User</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="role"
                  value="Counselor"
                  onChange={handleChange}
                />
                <label>Counselor</label>
              </div>
            </div>
            {messageErr && <p className={classes.err}>{messageErr}</p>}
            <button className={classes.btnSignup} onClick={handlersubmit}>
              SIGN UP
            </button>
          </form>
          <p className={classes.loginclick}>
            Login?
            <Link to="../login" className={classes.click}>
              Click
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
