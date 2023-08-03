const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const getFilePath = (url) => {
  return url.slice(process.env.URL.length + 9);
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", "uploads", filePath);
  fs.unlink(filePath, (err) => console.log("Error clearImage: " + err));
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const imagesUrl = [];
    const { name, category, price, count, short_desc, long_desc } = req.body;
    if (req.files) {
      const files = req.files;
      for (let i = 0; i < files.length; i++) {
        const { originalname, path } = files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        const url = `${process.env.URL}/${newPath}`;
        imagesUrl.push(url);
        fs.renameSync(path, newPath);
      }
    }

    const product = await Product.create({
      name,
      category,
      price,
      count,
      short_desc,
      long_desc,
      img1: imagesUrl[0],
      img2: imagesUrl[1],
      img3: imagesUrl[2],
      img4: imagesUrl[3],
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, price, count, short_desc, long_desc } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: name,
        category: category,
        price: price,
        count: count,
        short_desc: short_desc,
        long_desc: long_desc,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.reduceCountProduct = async (req, res, next) => {
  try {
    const { products } = req.body;
    for (let i = 0; i < products.length; i++) {
      const id = products[i].idProduct;
      const quantity = products[i].quantity;
      await Product.findByIdAndUpdate(id, { $inc: { count: -quantity } });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    clearImage(getFilePath(product.img1));
    clearImage(getFilePath(product.img2));
    clearImage(getFilePath(product.img3));
    clearImage(getFilePath(product.img4));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
