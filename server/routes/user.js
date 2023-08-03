const express = require("express");
const router = express.Router();
const {
  getClients,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { verifyToken, verifyAdmin } = require("../utils/verifyToken");

//GET ALL
router.get("/users", verifyToken, verifyAdmin, getUsers);

//GET
router.get("/:id", getUser);

//UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateUser);

//DELETE
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteUser);

//GET ALL CLIECTS
router.get("/", verifyToken, verifyAdmin, getClients);

module.exports = router;
