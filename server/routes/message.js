const express = require("express");

const router = express.Router();

const { addMessage } = require("../controllers/message");

const { verifyToken } = require("../utils/verifyToken");

router.post("/create", verifyToken, addMessage);

module.exports = router;
