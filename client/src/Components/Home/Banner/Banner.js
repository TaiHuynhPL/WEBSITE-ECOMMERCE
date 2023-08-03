import { Link } from "react-router-dom";

import banner from "../../../Images/banner1.jpg";
import classes from "./Banner.module.css";

//Component Banner của trang chủ
function Banner() {
  return (
    <div className={classes.banner}>
      <img src={banner} alt="Banner" />
      <div className={classes.info}>
        <h6 className={classes.title}>NEW INSPIRATION 2020</h6>
        <p className={classes.content}>20% OFF ON NEW SEASON</p>
        <Link to="shop" className={classes.btn}>
          Browse collections
        </Link>
      </div>
    </div>
  );
}

export default Banner;
