const { Group, GroupNotes } = require("../helper/relation");
const jwt = require("jsonwebtoken");

module.exports = {
  createGroupNotes: async (req, res) => {
    const groupId = await Group.findOne({
      where: { id: req.params.id },
    });
    if (!groupId) {
      res.status(404).json({ message: "grup tidak ditemukan" });
    }
    const { isPriority, date, day, note } = req.body;
    const decodeToken = jwt.decode(req.headers.token);
    const data = await GroupNotes.create({
      groupId: groupId.id,
      isPriority,
      date,
      day,
      note,
      createdBy: decodeToken.firstname,
    });
    res.status(200).json({ data });
  },

  update: async function (req, res) {
    const groupId = await Group.findOne({
      where: { id: req.params.groupId },
    });
    if (!groupId) {
      res.status(404).json({ message: "grup tidak ditemukan" });
    }
    const data = await GroupNotes.update(
      {
        note: req.body.note,
        isPriority: req.body.isPriority,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(400).json({ message: "failed update note" });
    } else {
      res.status(200).json({ message: "succes update note" });
    }
  },

  // read: async function (req, res) {
  //   const data = await Notes.findAll({});
  //   if (!data) {
  //     res.status(400).json({ message: "failed get all note" });
  //   } else {
  //     res.status(200).json({ message: "succes get all note", data: data });
  //   }
  // },

  delete: async function (req, res) {
    const groupId = await Group.findOne({
      where: { id: req.params.groupId },
    });
    if (!groupId) {
      res.status(404).json({ message: "grup tidak ditemukan" });
    }
    const data = await GroupNotes.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(400).json({ message: "failed delete note" });
    } else {
      res.status(200).json({ message: "note deleted" });
    }
  },
};
