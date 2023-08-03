import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./EditProduct.module.css";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/product/${productId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProduct(data);
    };
    getProduct();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "price" || e.target.name === "count") {
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const editProduct = async () => {
      const { data } = await axios.put(`/product/edit/${productId}`, product, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/product");
    };
    editProduct();
  };
  return (
    <div className={classes.newProduct}>
      <form className={classes.form}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          value={product?.name || ""}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={product?.category || ""}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={product?.price || 0}
          onChange={handleChange}
        />
        <label htmlFor="count">Count</label>
        <input
          type="number"
          name="count"
          value={product?.count || 0}
          onChange={handleChange}
        />
        <label>Short Description</label>
        <textarea
          name="short_desc"
          placeholder="Enter Short Description"
          rows="5"
          value={product?.short_desc || ""}
          onChange={handleChange}
        />
        <label>Long Description</label>
        <textarea
          name="long_desc"
          placeholder="Enter Long Description"
          rows="8"
          value={product?.long_desc || ""}
          onChange={handleChange}
        />

        <button className={classes.btn} onClick={handleEdit}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
