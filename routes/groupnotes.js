const express = require("express");
const router = express.Router();
const groupNoteController = require("../controller/groupnotes");
const middleware = require("../middleware/middleware");

router.post(
  "/createGroupNotes/:id",
  middleware.middleWareJWT,
  groupNoteController.createGroupNotes
);
// router.get("/read", noteController.read);
router.put("/updateGroupNote/:id/:groupId", groupNoteController.update);
router.delete("/deleteGroupNote/:id/:groupId", groupNoteController.delete);

module.exports = router;
