const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrdersByUser,
  getOrder,
  getAllOrder,
  updateDelivery,
  updateStatus,
} = require("../controllers/order");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

router.post("/create", verifyToken, createOrder);

router.get(
  "/getOrdersByUser/:userId",
  verifyToken,
  verifyUser,
  getOrdersByUser
);

router.get("/getOrder/:id", verifyToken, getOrder);

router.get("/getAllOrder", verifyToken, verifyAdmin, getAllOrder);

router.put("/delivery/:id", verifyToken, verifyAdmin, updateDelivery);

router.put("/status/:id", verifyToken, verifyAdmin, updateStatus);

module.exports = router;
