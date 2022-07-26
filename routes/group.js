const express = require("express");
const router = express.Router();
const groupController = require("../controller/group");
const auth = require("../middleware/middleware");

router.post("/createGroup", auth.middleWareJWT, groupController.createGroup);
router.post("/joinGroup", auth.middleWareJWT, groupController.joinGroup);
router.get("/getOneGroup/:id", auth.middleWareJWT, groupController.getGroup);
router.delete("/logoutGroup/:groupId", groupController.deleteUserGroup);

module.exports = router;
