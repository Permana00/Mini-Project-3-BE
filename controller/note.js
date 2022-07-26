const { Notes, User } = require("../helper/relation");
const jwt = require("jsonwebtoken");

module.exports = {
  create: async function (req, res) {
    const decodeToken = jwt.decode(req.headers.token);
    const data = await Notes.create({
      userId: decodeToken.id,
      isPriority: req.body.isPriority,
      date: req.body.date,
      day: req.body.day,
      note: req.body.note,
    });
    res.status(200).json({ data });
  },

  update: async function (req, res) {
    const id = req.params.id;
    const data = await Notes.update(
      {
        note: req.body.note,
        isPriority: req.body.isPriority,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!data) {
      res.status(400).json({ message: "failed update note" });
    } else {
      res.status(200).json({ message: "succes update note" });
    }
  },

  delete: async function (req, res) {
    const id = req.params.id;
    const data = await Notes.destroy({
      where: {
        id: id,
      },
    });
    if (!data) {
      res.status(400).json({ message: "failed delete note" });
    } else {
      res.status(200).json({ message: "note deleted" });
    }
  },
};
