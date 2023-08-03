import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionAuth } from "../../store/auth";
import { disconnectSocket } from "../../utils/socket";
import Cookies from "js-cookie";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(actionAuth.on_logout());
    disconnectSocket();
    Cookies.remove("access_token");
    navigate("../login");
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.center}>
        <ul>
          <div className={classes.title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <p className={classes.title}>MAIN</p>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? classes.active : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <div className={classes.title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
            <p>LISTS</p>
          </div>
          <NavLink
            to="product"
            className={({ isActive }) => (isActive ? classes.active : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) => (isActive ? classes.active : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <span>Users</span>
            </li>
          </NavLink>
          <div className={classes.title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <p>CHAT</p>
          </div>
          <NavLink
            to={"chat"}
            className={({ isActive }) => (isActive ? classes.active : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <span>Chat</span>
            </li>
          </NavLink>
          <div className={classes.title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p>USER</p>
          </div>
          <li onClick={handlerLogout}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
