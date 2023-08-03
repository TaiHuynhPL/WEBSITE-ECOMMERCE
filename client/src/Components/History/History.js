import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import classes from "./History.module.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.userlogin);
  const token = Cookies.get("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      const fetchData = async () => {
        const { data } = await axios.get(`/order/getOrdersByUser/${user.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setOrders(data);
      };
      fetchData();
    }
  }, []);

  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  const handleViewDetail = (id) => {
    navigate(`../order/${id}`);
  };

  return (
    <div className={classes.history}>
      <div className={classes.historyBanner}>
        <p className={classes.historylarge}>HISTORY</p>
        <p className={classes.historysmall}>HISTORY</p>
      </div>
      <table className={classes.tTable}>
        <tbody>
          <tr>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user}</td>
              <td>{order.customerInfo.name}</td>
              <td>{order.customerInfo.phone}</td>
              <td>{order.customerInfo.address}</td>
              <td>{convertPrice(order.totalValue)} VND</td>
              <td>{order.delivery}</td>
              <td>{order.status}</td>
              <td>
                <span
                  className={classes.viewDetail}
                  onClick={(e) => handleViewDetail(order._id)}
                >
                  View &rarr;
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
