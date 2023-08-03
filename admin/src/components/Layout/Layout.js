import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Layout.module.css";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={750}
        pauseOnFocusLoss
        theme="light"
      />
      {isLogin ? (
        <div className={classes.container}>
          <Sidebar />
          <div className={classes.outlet}>
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Layout;
