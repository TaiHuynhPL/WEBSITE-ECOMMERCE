import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionPopup } from "../../../store/popup";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import classes from "./Popup.module.css";

//Component Popup hiển thị thông tin sản phẩm
function Popup() {
  //tạo hàm dispatch
  const dispatch = useDispatch();
  //Lấy giá trị data từ state =popup của redux
  const dataPopup = useSelector((state) => state.popup.data);

  //Hàm để chuyển dãy số thành dãy số được viết theo format tiền
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  //Hàm khi click vào nút X trên popup
  const handlerCloseModal = () => {
    //dispatch action ẩn popup
    dispatch(actionPopup.hide_popup());
  };

  useEffect(() => {
    //Khi nhấn vào nút esc thì cũng ẩn popup
    const handlerKeydown = (event) => {
      if (event.key === "Escape") {
        dispatch(actionPopup.hide_popup());
      }
    };

    window.addEventListener("keydown", handlerKeydown);

    //cleanup function removeeventlistener để ngăn chặn rò rỉ bộ nhớ
    return () => {
      window.removeEventListener("keydown", handlerKeydown);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <button className={classes.closemodal} onClick={handlerCloseModal}>
          &times;
        </button>
        <img src={dataPopup.img} alt={dataPopup.name} className={classes.img} />
        <div className={classes.content}>
          <p className={classes.name}>{dataPopup.name}</p>
          <p className={classes.price}>{convertPrice(dataPopup.price)} VND</p>
          <p className={classes.desc}>{dataPopup.short_desc}</p>
          <Link to={`detail/${dataPopup.id}`} className={classes.btn}>
            <FontAwesomeIcon icon={faCartShopping} />
            View Detail
          </Link>
        </div>
      </div>
      <div className={classes.overlay} onClick={handlerCloseModal}></div>
    </div>
  );
}

export default Popup;
