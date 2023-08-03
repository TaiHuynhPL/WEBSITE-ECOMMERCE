const express = require("express");

const router = express.Router();

const { register, login, adminLogin } = require("../controllers/auth");

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//LOGIN - ADMIN
router.post("/admin/login", adminLogin);

module.exports = router;
