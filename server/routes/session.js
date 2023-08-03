const express = require("express");

const router = express.Router();

const {
  createSession,
  getAllSessionExist,
  changeSessionToNotExist,
  getSessionById,
} = require("../controllers/session");

const { verifyToken, verifyAdmin } = require("../utils/verifyToken");

router.post("/create", createSession);

router.get("/getAllSessionExist", getAllSessionExist);

router.put("/changeNotExist/:chatId", changeSessionToNotExist);

router.get("/getSessionById/:chatId", getSessionById);

module.exports = router;
