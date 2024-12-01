const express = require("express");
const { RegisterUser, Login, logout } = require("../controller/authController");
const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", Login)
router.post("/logout", logout)

module.exports = router