import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./DetailOrder.module.css";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [delivery, setDelivery] = useState();
  const [status, setStatus] = useState();
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getDetailOrder = async () => {
      const { data } = await axios.get(`/order/getOrder/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrder(data);
      setDelivery(data.delivery);
      setStatus(data.status);
    };
    getDetailOrder();
  }, []);

  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  const handleChangeDelivery = async (data) => {
    if (data !== delivery) {
      await axios.put(
        `/order/delivery/${id}`,
        { delivery: data },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDelivery(data);
    }
  };

  const handleChangeStatus = async (data) => {
    if (data !== status) {
      await axios.put(
        `/order/status/${id}`,
        { status: data },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setStatus(data);
    }
  };

  return (
    <div className={classes.order}>
      <div className={classes.top}>
        <div className={classes.orderInfo}>
          <h1>INFOMATION ORDER</h1>
          <p>ID User: {order?.user}</p>
          <p>Full Name: {order?.customerInfo.name}</p>
          <p>Phone: {order?.customerInfo.phone}</p>
          <p>Address: {order?.customerInfo.address}</p>
          <p>Total: {convertPrice(order?.totalValue)} VND</p>
        </div>
        <div>
          <div>
            <p>Change delivery:</p>
            <div className={classes.choose}>
              <button
                className={
                  delivery === "Waiting for progressing"
                    ? classes.btnactive
                    : classes.btn
                }
                onClick={(e) => handleChangeDelivery("Waiting for progressing")}
              >
                Waiting for progressing
              </button>
              <button
                className={
                  delivery === "Economical delivery"
                    ? classes.btnactive
                    : classes.btn
                }
                onClick={(e) => handleChangeDelivery("Economical delivery")}
              >
                Economical delivery
              </button>
              <button
                className={
                  delivery === "Fast delivery" ? classes.btnactive : classes.btn
                }
                onClick={(e) => handleChangeDelivery("Fast delivery")}
              >
                Fast delivery
              </button>
            </div>
          </div>
          <div>
            <p>Change status:</p>
            <div className={classes.choose}>
              <button
                className={
                  status === "Waiting for pay" ? classes.btnactive : classes.btn
                }
                onClick={(e) => handleChangeStatus("Waiting for pay")}
              >
                Waiting for pay
              </button>
              <button
                className={
                  status === "Delivering" ? classes.btnactive : classes.btn
                }
                onClick={(e) => handleChangeStatus("Delivering")}
              >
                Delivering
              </button>
              <button
                className={
                  status === "Delivered" ? classes.btnactive : classes.btn
                }
                onClick={(e) => handleChangeStatus("Delivered")}
              >
                Delivered
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className={classes.tTable}>
        <tbody>
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
          {order &&
            order?.products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img
                    src={product.idProduct.img1}
                    alt={product.idProduct.name}
                    className={classes.img}
                  />
                </td>
                <td>{product.idProduct.name}</td>
                <td>{convertPrice(product.idProduct.price)} VND</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailOrder;
