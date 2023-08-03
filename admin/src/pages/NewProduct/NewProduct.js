import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewProduct.module.css";
import Cookies from "js-cookie";
import axios from "axios";

const NewProduct = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const token = Cookies.get("access_token");

  const handleChange = (e) => {
    if (e.target.name === "price" || e.target.name === "count") {
      setInfo((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
    } else {
      setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleChangeFile1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleChangeFile2 = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleChangeFile3 = (e) => {
    setImage3(e.target.files[0]);
  };

  const handleChangeFile4 = (e) => {
    setImage4(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("images", image1);
    formData.append("images", image2);
    formData.append("images", image3);
    formData.append("images", image4);
    formData.set("name", info.name);
    formData.set("category", info.category);
    formData.set("price", info.price);
    formData.set("count", info.count);
    formData.set("short_desc", info.short_desc);
    formData.set("long_desc", info.long_desc);
    try {
      await axios.post("/product/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.newProduct}>
      <form className={classes.form}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          value={info?.name || ""}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={info?.category || ""}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          min={0}
          value={info?.price || 0}
          onChange={handleChange}
        />
        <label htmlFor="count">Quantity available in stock (Count)</label>
        <input
          type="number"
          name="count"
          min={0}
          value={info?.count || 0}
          onChange={handleChange}
        />
        <label>Short Description</label>
        <textarea
          name="short_desc"
          placeholder="Enter Short Description"
          rows="4"
          value={info?.short_desc || ""}
          onChange={handleChange}
        />
        <label>Long Description</label>
        <textarea
          name="long_desc"
          placeholder="Enter Long Description"
          rows="6"
          value={info?.long_desc || ""}
          onChange={handleChange}
        />
        <label>Upload image (4 images)</label>
        <input
          type="file"
          name="images"
          placeholder="Choose Files"
          onChange={handleChangeFile1}
        />
        <input
          type="file"
          name="images"
          placeholder="Choose Files"
          onChange={handleChangeFile2}
        />
        <input
          type="file"
          name="images"
          placeholder="Choose Files"
          onChange={handleChangeFile3}
        />
        <input
          type="file"
          name="images"
          placeholder="Choose Files"
          onChange={handleChangeFile4}
        />
        <button className={classes.btn} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
