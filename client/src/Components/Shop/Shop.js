import { useState } from "react";

import ProductList from "./ProductList/ProductList";
import { useLoaderData } from "react-router-dom";

import classes from "./Shop.module.css";

function Shop() {
  //tạo state cho việc người dùng chọn category nào
  const [category, setCategory] = useState("all");
  //Tạo state cho việc sort sản phẩm
  const [sort, setSort] = useState("");
  //tạo state cho ô search
  const [searchInputValue, setSearchInputValue] = useState("");

  //Suer dụng useLoaderData để lấy dữ liệu
  const dataProducts = useLoaderData();

  //Danh sách sản phẩm hiển thị cho người dùng sau khi:
  const resultDataRender = dataProducts
    //lọc theo category
    .filter((data) => data.category === category || category === "all")
    //lọc theo thông tin người search
    .filter((data) => data.name.includes(searchInputValue.trim()))
    //và sort danh sách theo ý người dùng
    .sort((a, b) => {
      if (sort === "Price: min - max") {
        return a.price - b.price;
      }
      if (sort === "Price: max - min") {
        return b.price - a.price;
      }
      return 0;
    });

  //Các hàm khi người dùng chọn category:
  const handlerIphone = () => {
    setCategory("iphone");
  };

  const handlerAll = () => {
    setCategory("all");
  };

  const handlerIpad = () => {
    setCategory("ipad");
  };

  const handlerMacbook = () => {
    setCategory("macbook");
  };

  const handlerAirpod = () => {
    setCategory("airpod");
  };

  const handlerWatch = () => {
    setCategory("watch");
  };

  const handlerMouse = () => {
    setCategory("mouse");
  };

  const handlerKeyboard = () => {
    setCategory("keyboard");
  };

  const handlerOther = () => {
    setCategory("other");
  };

  //hàm khi người dùng thay đổi thông tin sort
  const handlerSort = (event) => {
    setSort(event.target.value);
  };

  //Hàm khi người dùng nhập vào ô search
  const handlerSearch = (event) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <div className={classes.shop}>
      <div className={classes.shopBanner}>
        <p className={classes.shoplarge}>SHOP</p>
        <p className={classes.shopsmall}>SHOP</p>
      </div>
      <div className={classes.content}>
        <div className={classes.navbarContainer}>
          <h3 className={classes.categories}>CATEGORIES</h3>
          <div className={classes.namecategories}>APPLE</div>
          <div className={classes.item} onClick={handlerAll}>
            All
          </div>
          <div className={classes.title}>IPHONE & MAC</div>
          <div className={classes.item} onClick={handlerIphone}>
            Iphone
          </div>
          <div className={classes.item} onClick={handlerIpad}>
            Ipad
          </div>
          <div className={classes.item} onClick={handlerMacbook}>
            Macbook
          </div>
          <div className={classes.title}>WIRELESS</div>
          <div className={classes.item} onClick={handlerAirpod}>
            Airpod
          </div>
          <div className={classes.item} onClick={handlerWatch}>
            Watch
          </div>
          <div className={classes.title}>OTHER</div>
          <div className={classes.item} onClick={handlerMouse}>
            Mouse
          </div>
          <div className={classes.item} onClick={handlerKeyboard}>
            Keyboard
          </div>
          <div className={classes.item} onClick={handlerOther}>
            Other
          </div>
        </div>
        <div className={classes.productListContainer}>
          <div className={classes.inputcontainer}>
            <input
              type="text"
              className={classes.input}
              placeholder="Enter Search Here!"
              value={searchInputValue}
              onChange={handlerSearch}
            />
            <select className={classes.selectsort} onChange={handlerSort}>
              <option>Default sort</option>
              <option>Price: min - max</option>
              <option>Price: max - min</option>
            </select>
          </div>
          <ProductList data={resultDataRender} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
