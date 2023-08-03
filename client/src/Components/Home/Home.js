import { useSelector } from "react-redux";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "./Products/Products";
import OtherInfomation from "./OtherInfomation/OtherInfomation";
import Popup from "./Popup/Popup";
import classes from "./Home.module.css";

//Component Trang chủ (Home)
function Home() {
  //tạo state giúp cho việc hiển thị popup của sản phẩm
  const isShowPopup = useSelector((state) => state.popup.isShowPopup);
  return (
    <div className={classes.home}>
      <Banner />
      <Category />
      <Products />
      {isShowPopup && <Popup />}
      <OtherInfomation />
    </div>
  );
}

export default Home;
