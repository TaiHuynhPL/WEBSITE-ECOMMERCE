import React, { useEffect, useState } from "react";
import classes from "./DetailOrder.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const token = Cookies.get("access_token");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/order/getOrder/${orderId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setOrder(data);
    };
    fetchData();
  }, []);

  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  return (
    <div className={classes.order}>
      <div className={classes.orderInfo}>
        <h1>INFOMATION ORDER</h1>
        <p>ID User: {order?.user}</p>
        <p>Full Name: {order?.customerInfo.name}</p>
        <p>Phone: {order?.customerInfo.phone}</p>
        <p>Address: {order?.customerInfo.address}</p>
        <p>Total: {convertPrice(order?.totalValue)} VND</p>
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
