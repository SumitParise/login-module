// router handles all incoming req & res

const express = require("express");
const { home, register , login } = require("../controller/auth-controller");
const router = express.Router();

router.route("/user").get(home);

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;
