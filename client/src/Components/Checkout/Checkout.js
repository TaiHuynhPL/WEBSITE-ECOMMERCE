import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./Checkout.module.css";

//Component thanh toán, check out
function Checkout() {
  const [customerInfo, setCustomerInfo] = useState();
  //Lấy giá trị mảng sản phẩm và tổng tiền thanh toán từ state listcart của redux
  const cartitems = useSelector((state) => state.listcart.items);
  const totalAmount = useSelector((state) => state.listcart.totalAmount);
  const { user } = useSelector((state) => state.userlogin);

  //Hàm để chuyển dãy số thành dãy số được viết theo format tiền
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  const handleChange = (e) => {
    setCustomerInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hanldeOrder = async (e) => {
    e.preventDefault();
    if (cartitems.length > 0) {
      try {
        const resCheckout = await axios.post(
          "/stripe/create-checkout-session",
          {
            cartItems: cartitems,
            userId: user.id,
          }
        );

        if (resCheckout.data.url) {
          localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
          window.location.href = resCheckout.data.url;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={classes.checkout}>
      <div className={classes.checkoutBanner}>
        <p className={classes.checkoutlarge}>SHOP</p>
        <p className={classes.checkoutsmall}>
          <span className={classes.navbanner}>HOME / </span>
          <span className={classes.navbanner}>CART / </span>SHOP
        </p>
      </div>
      <h5>BILLING DETAILS</h5>
      <div className={classes.checkoutContainer}>
        <div className={classes.info}>
          <label htmlFor="name" className={classes.infolabel}>
            FULL NAME:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Full Name Here!"
            className={classes.infoinput}
            onChange={handleChange}
          />
          <label htmlFor="email" className={classes.infolabel}>
            EMAIL:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Here!"
            className={classes.infoinput}
            onChange={handleChange}
          />
          <label htmlFor="phone" className={classes.infolabel}>
            PHONE NUMBER:
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Your Phone Number Here!"
            className={classes.infoinput}
            onChange={handleChange}
          />
          <label htmlFor="address" className={classes.infolabel}>
            ADDRESS:
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter Your Address Here!"
            className={classes.infoinput}
            onChange={handleChange}
          />
          <button className={classes.infobtn} onClick={hanldeOrder}>
            Place order
          </button>
        </div>
        <div className={classes.order}>
          <div className={classes.orderContainer}>
            <p className={classes.ordertitle}>YOUR ORDER</p>
            {cartitems.map((item) => (
              <div key={item.id} className={classes.orderitem}>
                <p className={classes.orderitemName}>{item.name}</p>
                <p className={classes.orderitemPrice}>
                  {convertPrice(item.price)} VND x {item.amount}
                </p>
              </div>
            ))}

            <div className={classes.total}>
              <p className={classes.totalName}>TOTAL</p>
              <p className={classes.totalPrice}>
                {convertPrice(totalAmount)} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
