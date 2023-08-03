import { Link } from "react-router-dom";

import classes from "./ProductList.module.css";

function ProductList({ data }) {
  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  return (
    <div className={classes.productlist}>
      {data.map((product) => (
        <div key={product._id} className={classes.item}>
          <Link to={`../detail/${product._id}`} className={classes.img}>
            <img src={product.img1} alt={product.name} />
            <div className={classes.overlay}></div>
          </Link>
          <p className={classes.name}>{product.name}</p>
          <p className={classes.price}>{convertPrice(product.price)} VND</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
