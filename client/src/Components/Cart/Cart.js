import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionListCart } from "../../store/listCart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import classes from "./Cart.module.css";

//Component Giỏ hàng
function Cart() {
  //Lấy giá trị mảng sản phẩm và tổng tiền thanh toán từ state listcart của redux
  const cartitems = useSelector((state) => state.listcart.items);
  const totalAmount = useSelector((state) => state.listcart.totalAmount);

  //tạo hàm dispatch
  const dispatch = useDispatch();

  //Khi nhấn nút giảm số lượng vào sản phẩm (index là vị trí sản phẩm có trong mảng)
  const handlerdown = (index) => {
    //nếu số lượng sản phẩm đó <= 1 thì xóa sản phẩm
    if (cartitems[index].amount <= 1) {
      dispatch(actionListCart.delete_cart(cartitems[index]));

      //ngược lại nếu lớn hơn 1
    } else {
      //số lượng của sản phẩm giảm đi 1
      const newItemAmount = cartitems[index].amount - 1;
      //cập nhật lại sản phẩm được thay đổi và lưu vào biến mới
      const newItem = { ...cartitems[index], amount: newItemAmount };
      //tạo mảng giỏ hàng mới giống với mảng giỏ hàng cũ để thay đổi
      const newCartItems = [...cartitems];
      //xóa bỏ sản phẩm cũ đi và thêm sản phẩm mới đã cập nhật vào mảng mới
      newCartItems.splice(index, 1, newItem);
      //Giảm tổng tiền thanh toán
      const newTotalAmount = totalAmount - Number(cartitems[index].price);
      console.log(totalAmount, cartitems[index].price);

      //dispatch action cập nhật sản phẩm
      dispatch(
        actionListCart.update_cart({
          items: newCartItems,
          totalAmount: newTotalAmount,
        })
      );
    }
  };

  //Khi nhấn nút tăng số lượng vào sản phẩm (index là vị trí sản phẩm có trong mảng)
  const handlerup = (index) => {
    //số lượng của sản phẩm tăng lên 1
    const newItemAmount = cartitems[index].amount + 1;
    //cập nhật lại sản phẩm được thay đổi và lưu vào biến mới
    const newItem = { ...cartitems[index], amount: newItemAmount };
    //tạo mảng giỏ hàng mới giống với mảng giỏ hàng cũ để thay đổi
    const newCartItem = [...cartitems];
    //xóa bỏ sản phẩm cũ đi và thêm sản phẩm mới đã cập nhật vào mảng mới
    newCartItem.splice(index, 1, newItem);
    //Tăng tổng tiền thanh toán
    const newTotalAmount = totalAmount + Number(cartitems[index].price);
    //dispatch action cập nhật sản phẩm
    dispatch(
      actionListCart.update_cart({
        items: newCartItem,
        totalAmount: newTotalAmount,
      })
    );
  };

  //Hàm khi thay đổi trực tiếp số lượng sp vào ô input
  const handlerChangeInputItem = (event, index) => {
    //Lấy giá trị trong ô input và gnas vào biến mới
    const newItemAmount = Number(event.target.value);
    //cập nhật lại sản phẩm được thay đổi và lưu vào biến mới
    const newItem = { ...cartitems[index], amount: newItemAmount };
    //tạo mảng giỏ hàng mới giống với mảng giỏ hàng cũ để thay đổi
    const newCartItem = [...cartitems];
    //xóa bỏ sản phẩm cũ đi và thêm sản phẩm mới đã cập nhật vào mảng mới
    newCartItem.splice(index, 1, newItem);
    //Thay đổi tổng tiền thanh toán
    const newTotalAmount =
      totalAmount +
      Number(newCartItem[index].amount - cartitems[index].amount) *
        cartitems[index].price;

    //dispatch action cập nhật sản phẩm
    dispatch(
      actionListCart.update_cart({
        items: newCartItem,
        totalAmount: newTotalAmount,
      })
    );
  };

  //Hàm xóa sản phẩm (index là vị trí sản phẩm)
  const handlerDeleteItem = (index) => {
    dispatch(actionListCart.delete_cart(cartitems[index]));
  };

  //Hàm để chuyển dãy số thành dãy số được viết theo format tiền
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  return (
    <div className={classes.cart}>
      <div className={classes.cartBanner}>
        <p className={classes.cartlarge}>SHOP</p>
        <p className={classes.cartsmall}>SHOP</p>
      </div>
      <h3>SHOPING CART</h3>
      <div className={classes.cartContent}>
        <div className={classes.cartList}>
          <div className={classes.cartListTitle}>
            <p className={classes.titleImage}>IMAGE</p>
            <p className={classes.titleProduct}>PRODUCT</p>
            <p className={classes.titlePrice}>PRICE</p>
            <p className={classes.titleQuantity}>QUANTITY</p>
            <p className={classes.titleTotal}>TOTAL</p>
            <p className={classes.titleRemove}>REMOVE</p>
          </div>
          <div>
            {cartitems.map((item, index) => (
              <div key={item.id} className={classes.cartitem}>
                <img
                  src={item.img}
                  alt={item.name}
                  className={classes.cartitemImg}
                />
                <p className={classes.cartitemName}>{item.name}</p>
                <p className={classes.cartitemPrice}>
                  {convertPrice(item.price)} VND
                </p>
                <div className={classes.inputContainer}>
                  <div
                    className={classes.inputdown}
                    onClick={() => handlerdown(index)}
                  ></div>
                  <input
                    type="number"
                    className={classes.input}
                    value={cartitems[index].amount}
                    onChange={(event) => handlerChangeInputItem(event, index)}
                  />
                  <div
                    className={classes.inputup}
                    onClick={() => handlerup(index)}
                  ></div>
                </div>
                <p className={classes.cartitemTotal}>
                  {convertPrice(item.price * cartitems[index].amount)} VND
                </p>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => handlerDeleteItem(index)}
                />
              </div>
            ))}
          </div>
          <div className={classes.cartListNavigate}>
            <Link to="../shop" className={classes.navShop}>
              <span className={classes.arrowleft}>&larr;</span> Continue
              shopping
            </Link>
            <Link to="../checkout" className={classes.navCheckout}>
              Proceed to checkout{" "}
              <span className={classes.arrowright}>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className={classes.cartTotal}>
          <h5>CART TOTAL</h5>
          <div>
            {cartitems.map((item) => (
              <div key={item.id} className={classes.totalContent}>
                <div className={classes.subtotal}>
                  <h6>{item.name}</h6>
                  <p>
                    {convertPrice(item.price)} VND x {item.amount}
                  </p>
                </div>
              </div>
            ))}
            <div className={classes.total}>
              <p>TOTAL</p>
              <p>{convertPrice(totalAmount)} VND</p>
            </div>
          </div>

          <div className={classes.coupon}>
            <input
              type="text"
              placeholder="Enter your coupon"
              className={classes.inputcoupon}
            />
            <button className={classes.btncoupon}>
              <FontAwesomeIcon icon={faGift} />
              <p>Apply coupon</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
