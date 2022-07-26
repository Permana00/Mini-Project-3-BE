const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/get/:id", userController.getOneId);

module.exports = router;
