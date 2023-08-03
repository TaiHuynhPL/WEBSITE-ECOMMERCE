import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./EditUser.module.css";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [messageErr, setMessageErr] = useState(null);
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (user.password !== user.confirmpassword) {
        setMessageErr("Confirm Password incorect!");
      } else {
        await axios.put(`/user/${userId}`, user, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
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
          value={user?.fullname || ""}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={user?.email || ""}
          onChange={handleChange}
        />
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          value={user?.password || ""}
          onChange={handleChange}
        />
        <label htmlFor="confirmpassword">Confirm New Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={user?.confirmpassword || ""}
          onChange={handleChange}
        />
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={user?.phone || ""}
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
              checked={user?.role === "User"}
              value="User"
              onChange={handleChange}
            />
            <label>: User</label>
          </div>
          <div className={classes.inputradio}>
            <input
              type="radio"
              name="role"
              checked={user?.role === "Counselor"}
              value="Counselor"
              onChange={handleChange}
            />
            <label>: Counselor</label>
          </div>
          <div className={classes.inputradio}>
            <input
              type="radio"
              name="role"
              checked={user?.role === "Admin"}
              value="Admin"
              onChange={handleChange}
            />
            <label>: Admin</label>
          </div>
        </div>
        {messageErr && <p className={classes.err}>{messageErr}</p>}

        <button className={classes.btn} onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
