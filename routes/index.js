const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");

router.get("/", messageController.show_msg);

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout);

router.get("/create_msg", messageController.create_msg_get);
router.post("/create_msg", messageController.create_msg_post);

module.exports = router;
