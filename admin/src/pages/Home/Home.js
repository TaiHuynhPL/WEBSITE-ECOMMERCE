import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Home.module.css";
import Widget from "../../components/Widget/Widget";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [clents, setClients] = useState([]);
  const [earningsOfMonth, setEarningsOfMonth] = useState();
  const token = Cookies.get("access_token");

  const getYear = (date) => {
    const d = new Date(Date.parse(date));
    return d.getFullYear();
  };

  const getMonth = (date) => {
    const d = new Date(Date.parse(date));
    return d.getMonth() + 1;
  };

  useEffect(() => {
    const getData = async () => {
      const { data: order } = await axios.get("/order/getAllOrder", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data: client } = await axios.get("/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrders(order);
      setClients(client);
      const now = new Date(Date.now());
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      setEarningsOfMonth(
        order
          .filter(
            (o) =>
              getYear(o.createdAt) === year && getMonth(o.createdAt) === month
          )
          .reduce((totalValue, o) => (totalValue += o.totalValue), 0)
      );
    };
    getData();
  }, []);

  const handleView = (id) => {
    navigate(`/order/detail/${id}`);
  };

  return (
    <div className={classes.home}>
      <div className={classes.homeContainer}>
        <h2>Dashboard</h2>
        <div className={classes.widgets}>
          <Widget type="client" quantity={clents.length} />
          <Widget type="earning" quantity={earningsOfMonth} />
          <Widget type="order" quantity={orders.length} />
        </div>
        <div className={classes.listContainer}>
          <h4>History</h4>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user._id}</td>
                  <td>{order.customerInfo.name}</td>
                  <td>{order.customerInfo.phone}</td>
                  <td>{order.customerInfo.address}</td>
                  <td>{order.totalValue}</td>
                  <td>{order.delivery}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className={classes.btn}
                      onClick={(e) => handleView(order._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
