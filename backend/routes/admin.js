const express = require("express");
const router = express.Router();

const signupController = require("../controllers/create-admin");
const adminAuthController = require("../controllers/admin-auth");

router.post("/signup", signupController.createUser);

router.post("/login", adminAuthController.checkLogin);

module.exports = router;
