import { useRef } from "react";
import { useDispatch } from "react-redux";
import { actionListCart } from "../../store/listCart";
import { useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import classes from "./DetaiProduct.module.css";

function DetailProduct() {
  //Sử dụng useRef để lấy element input
  const inputRef = useRef();

  //tạo hàm dispatch
  const dispatch = useDispatch();

  //Sử dụng useLoaderData để tải dataProducts xuống khi mount component
  const dataProducts = useLoaderData();

  //sử dụng useParams để lấy giá trị params trên url
  const params = useParams();

  //Dựa vào params lọc sản phẩm chi tiết mà người dùng muốn xem
  const detailProduct = dataProducts.filter(
    (product) => product._id.toString() === params.productId.toString()
  )[0];

  //Hàm để chuyển dãy số thành dãy số được viết theo format tiền
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  //Chuyển đổi chuỗi long_desc lấy được thành jsx(để hiển thị xuống dòng cho chuỗi đó)
  const longDesc = detailProduct.long_desc
    .split("\n")
    .filter((item) => item !== "")
    .map((item, i) => (
      <p key={i} className={classes.descItem}>
        {item}{" "}
      </p>
    ));

  //Lọc lấy danh sách sản phẩm có liên quan(có cùng category)
  const relatedProduct = dataProducts.filter(
    (product) =>
      product.category === detailProduct.category &&
      product._id !== detailProduct._id
  );

  //Hàm khi click thêm sản phẩm vào giỏ hàng
  const handlerAddCart = () => {
    if (Number(inputRef.current.value) > 0) {
      //tạo mới thông tin sản phẩm lấy được
      const item = {
        id: detailProduct._id,
        img: detailProduct.img1,
        name: detailProduct.name,
        price: detailProduct.price,
        amount: Number(inputRef.current.value),
      };
      //dispatch action thêm mới sp
      dispatch(actionListCart.add_cart(item));
    }
  };

  //hàm khi click nút giảm của ô input
  const handlerdown = () => {
    inputRef.current.stepDown();
  };

  //hàm khi click nút tăng của ô input
  const handlerup = () => {
    inputRef.current.stepUp();
  };

  return (
    <div className={classes.detailContent}>
      <div className={classes.detailProduct}>
        <div className={classes.imgs}>
          <div className={classes.imgsmall}>
            <img
              src={detailProduct.img1}
              alt={detailProduct.name}
              className={classes.imgsmallitem}
            />
            <img
              src={detailProduct.img2}
              alt={detailProduct.name}
              className={classes.imgsmallitem}
            />
            <img
              src={detailProduct.img3}
              alt={detailProduct.name}
              className={classes.imgsmallitem}
            />
            <img
              src={detailProduct.img4}
              alt={detailProduct.name}
              className={classes.imgsmallitem}
            />
          </div>
          <img
            src={detailProduct.img1}
            alt={detailProduct.name}
            className={classes.imglarge}
          />
        </div>
        <div className={classes.detailInfo}>
          <h3 className={classes.name}>{detailProduct.name}</h3>
          <p className={classes.price}>
            {convertPrice(detailProduct.price)} VND
          </p>
          <p className={classes.shortdesc}>{detailProduct.short_desc}</p>
          <p className={classes.categorycontainer}>
            CATEGORY:
            <span className={classes.category}>{detailProduct.category}</span>
          </p>
          <div className={classes.inputContainer}>
            <div className={classes.inputNavContainer}>
              <p>QUANTITY</p>
              <div className={classes.inputcon}>
                <div className={classes.inputdown} onClick={handlerdown}></div>
                <input
                  type="number"
                  className={classes.input}
                  min={0}
                  max={detailProduct.count}
                  defaultValue={0}
                  ref={inputRef}
                />
                <div className={classes.inputup} onClick={handlerup}></div>
              </div>
            </div>

            <button className={classes.btnAddCart} onClick={handlerAddCart}>
              Add to cart
            </button>
          </div>
          <p
            className={
              detailProduct.count === 0 ? classes.empty : classes.count
            }
          >
            Available: <span>{detailProduct.count}</span>
          </p>
        </div>
      </div>
      <div className={classes.decription}>
        <div className={classes.btnDescription}>DESCRIPTION</div>
        <h5>PRODUCT DESCRIPTION</h5>
        <div className={classes.longdesc}>{longDesc}</div>
      </div>
      <div className={classes.relatedProducts}>
        {relatedProduct.map((product) => (
          <div key={product._id} className={classes.relatedProductsItem}>
            <Link to={`../detail/${product._id}`}>
              <img
                src={product.img1}
                alt={product.name}
                className={classes.relatedImg}
              />
            </Link>
            <p className={classes.relatedName}>{product.name}</p>
            <p className={classes.relatedPrice}>
              {convertPrice(product.price)} VND
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailProduct;
