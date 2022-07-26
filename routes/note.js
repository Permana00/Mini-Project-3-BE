const express = require("express");
const router = express.Router();
const noteController = require("../controller/note");
const middleware = require("../middleware/middleware");

router.post(
  "/createUserNotes",
  middleware.middleWareJWT,
  noteController.create
);
// router.get("/read", noteController.read);
router.put("/updateUserNotes/:id", noteController.update);
router.delete("/deleteUserNotes/:id", noteController.delete);

module.exports = router;
