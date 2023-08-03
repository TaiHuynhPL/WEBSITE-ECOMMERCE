import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie";

import classes from "./Product.module.css";

const Product = () => {
  const navigate = useNavigate();
  const [produsts, setProducts] = useState([]);
  const [initiaProdusts, setInitiaProdusts] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const token = Cookies.get("access_token");

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axios.get("/product", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProducts(data);
      setInitiaProdusts(data);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    setProducts(() =>
      initiaProdusts.filter((product) =>
        product.name.toLowerCase().includes(valueSearch.toLowerCase().trim())
      )
    );
  }, [valueSearch]);

  const handleUpdate = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await axios.delete(`/product/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setProducts((prev) => prev.filter((product) => product._id !== id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleAddNew = () => {
    navigate("/product/new");
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.top}>
        <div>
          <h1>Products</h1>
          <input
            placeholder="Enter Search!"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
        </div>
        <button onClick={handleAddNew}>
          Add new
          <div className={classes.iconButton}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <div className={classes.bottom}>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Count</th>
              <th>Edit</th>
            </tr>
            {produsts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={product.img1}
                    alt={product.name}
                    className={classes.img}
                  />
                </td>
                <td>{product.category}</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className={classes.btnupdate}
                    onClick={(e) => handleUpdate(product._id)}
                  >
                    Update
                  </button>
                  <button
                    className={classes.btndelete}
                    onClick={(e) => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
