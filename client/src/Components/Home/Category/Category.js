import { Link } from "react-router-dom";

import iphone from "../../../Images/product_1.png";
import mac from "../../../Images/product_2.png";
import ipad from "../../../Images/product_3.png";
import watch from "../../../Images/product_4.png";
import airpods from "../../../Images/product_5.png";
import classes from "./Category.module.css";

//Component Categore của trang chủ
function Category() {
  return (
    <div className={classes.categoryContainer}>
      <div className={classes.title}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h4>BROWSE OUR CATEGORIES</h4>
      </div>
      <div>
        <div className={classes.category}>
          <Link to="shop">
            <img src={iphone} alt="iPhone" className={classes.categoryimg} />
            <div className={classes.overlay}></div>
          </Link>
          <Link to="shop">
            <img src={mac} alt="Mac" className={classes.categoryimg} />
            <div className={classes.overlay}></div>
          </Link>
        </div>
        <div className={classes.category}>
          <Link to="shop">
            <img src={ipad} alt="iPad" className={classes.categoryimg} />
            <div className={classes.overlay}></div>
          </Link>
          <Link to="shop">
            <img src={watch} alt="WATCH" className={classes.categoryimg} />
            <div className={classes.overlay}></div>
          </Link>
          <Link to="shop">
            <img src={airpods} alt="AirPods" className={classes.categoryimg} />
            <div className={classes.overlay}></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
