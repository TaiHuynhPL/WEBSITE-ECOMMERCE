const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  reduceCountProduct,
} = require("../controllers/product");

const { verifyToken, verifyAdmin } = require("../utils/verifyToken");

router.get("/:id", getProduct);

router.get("/", getAllProducts);

router.post(
  "/new",
  verifyToken,
  verifyAdmin,
  upload.array("images"),
  createProduct
);

router.put("/edit/:id", verifyToken, verifyAdmin, editProduct);

router.post("/reduceCount", verifyToken, reduceCountProduct);

router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
