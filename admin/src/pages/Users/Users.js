import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie";

import classes from "./User.module.css";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [initiaUsers, setInitiaUsers] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get("/user/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUsers(data);
      setInitiaUsers(data);
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    setUsers(() =>
      initiaUsers.filter((user) =>
        user.fullname.toLowerCase().includes(valueSearch.toLowerCase().trim())
      )
    );
  }, [valueSearch]);

  const handleUpdate = (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await axios.delete(`/user/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setUsers((prev) => prev.filter((product) => product._id !== id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleAddNew = () => {
    navigate("/user/new");
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.top}>
        <div>
          <h1>Users</h1>
          <input
            placeholder="Enter Search!"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
        </div>
        <button onClick={handleAddNew}>
          Add new
          <div className={classes.iconButton}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <div className={classes.bottom}>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={classes.btnupdate}
                    onClick={(e) => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className={classes.btndelete}
                    onClick={(e) => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
