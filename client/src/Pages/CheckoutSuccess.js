import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { actionListCart } from "../store/listCart";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.listcart.items);
  const totalAmount = useSelector((state) => state.listcart.totalAmount);
  const { user } = useSelector((state) => state.userlogin);
  const token = Cookies.get("access_token");

  const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));

  const products = cartitems.map((item) => ({
    idProduct: item.id,
    quantity: item.amount,
  }));

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(
          "/order/create",
          {
            customerInfo: customerInfo,
            products: products,
            totalValue: totalAmount,
            user: user.id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (res.status === 200) {
          localStorage.removeItem("customerInfo");
          localStorage.removeItem("listCart");
          dispatch(actionListCart.reset_cart());

          await axios.post(
            "/product/reduceCount",
            { products },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    createOrder();
  }, []);
  return (
    <div
      style={{
        minHeight: "51vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Checkout Success</h2>
    </div>
  );
};

export default CheckoutSuccess;
