import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewUser.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const NewUser = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [messageErr, setMessageErr] = useState(null);
  const token = Cookies.get("access_token");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (info.password !== info.confirmpassword) {
        setMessageErr("Confirm Password incorect!");
      } else {
        await axios.post(
          "/auth/register",
          {
            fullname: info.fullname,
            email: info.email,
            password: info.password,
            phone: info.phone,
            role: info.role,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        navigate("/users");
      }
    } catch (error) {
      setMessageErr(error.response.data.message);
    }
  };
  return (
    <div className={classes.newProduct}>
      <form className={classes.form}>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={info?.fullname || ""}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={info?.email || ""}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={info?.password || ""}
          onChange={handleChange}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={info?.confirmpassword || ""}
          onChange={handleChange}
        />
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={info?.phone || ""}
          pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
          maxLength="12"
          onChange={handleChange}
        />
        <label>Role :</label>
        <div>
          <div className={classes.inputradio}>
            <input
              type="radio"
              name="role"
              defaultChecked
              value="User"
              onChange={handleChange}
            />
            <label>: User</label>
          </div>
          <div className={classes.inputradio}>
            <input
              type="radio"
              name="role"
              value="Counselor"
              onChange={handleChange}
            />
            <label>: Counselor</label>
          </div>
          <div className={classes.inputradio}>
            <input
              type="radio"
              name="role"
              value="Admin"
              onChange={handleChange}
            />
            <label>: Admin</label>
          </div>
        </div>
        {messageErr && <p className={classes.err}>{messageErr}</p>}

        <button className={classes.btn} onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
