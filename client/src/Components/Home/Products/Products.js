import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionPopup } from "../../../store/popup";
import axios from "axios";
import classes from "./Products.module.css";

function Products() {
  //tạo state để lưu dữ liệu được lấy từ api
  const [dataProducts, setDataProducts] = useState([]);
  //tạo hàm dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/product");

      setDataProducts(data);
    };
    fetchProducts();
  }, []);

  //Hàm để chuyển dãy số thành dãy số được viết theo format tiền
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  //Hàm khi click vào sản phẩm
  const handlerImageProduct = (data) => {
    //dispatch action hiểm thị popup
    dispatch(actionPopup.show_popup(data));
  };

  return (
    <div>
      <div className={classes.title}>
        <p>MADE THE HARD WAY</p>
        <h4>TOP TRENDING PRODUCTS</h4>
      </div>
      <div className={classes.productsContainer}>
        {dataProducts.map((product) => (
          <div key={product._id} className={classes.item}>
            <div
              className={classes.img}
              onClick={() =>
                handlerImageProduct({
                  id: product._id,
                  img: product.img1,
                  name: product.name,
                  price: product.price,
                  short_desc: product.short_desc,
                })
              }
            >
              <img src={product.img1} alt={product.name} />
              <div className={classes.overlay}></div>
            </div>
            <p className={classes.name}>{product.name}</p>
            <p className={classes.price}>{convertPrice(product.price)} VND</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
