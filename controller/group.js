const { User, UserGroups, Group, GroupNotes } = require("../helper/relation");
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken");

module.exports = {
  createGroup: async (req, res) => {
    const { groupName } = req.body;
    const groupCode = Math.floor(100000 + Math.random() * 900000);
    const decodeToken = jwt.decode(req.headers.token);
    const data = await Group.create({
      groupName,
      groupCode,
    });
    await UserGroups.create({
      UserId: decodeToken.id,
      GroupId: data.id,
    });
    res.status(200).json({ data });
  },

  joinGroup: async (req, res) => {
    const findGroup = await Group.findOne({
      where: { groupCode: req.body.groupCode },
    });
    if (!findGroup) {
      res.status(404).json({ message: "group tidak ada" });
    }
    const decodeToken = jwt.decode(req.headers.token);
    const joinGroup = await UserGroups.create({
      UserId: decodeToken.id,
      GroupId: findGroup.id,
    });
    res.status(200).json({ message: "berhasil join group" });
  },

  getGroup: async (req, res) => {
    const includeAble = [
      {
        model: User,
        attributes: ["id", "firstname", "lastname", "email"],
        through: { attributes: [] },
      },
      {
        model: GroupNotes,
        attributes: [
          "id",
          "date",
          "day",
          "note",
          "createdBy",
          "isPriority",
          "createdAt",
        ],
      },
    ];
    const data = await Group.findOne({
      where: { id: req.params.id },
      include: includeAble,
    });
    res.status(200).json({ data });
  },

  deleteUserGroup: async (req, res) => {
    const decodeToken = jwt.decode(req.headers.token);
    const findGroup = await Group.findOne({
      where: { groupCode: req.body.groupCode },
    });
    const data = await UserGroups.destroy({
      where: {
        [Op.and]: [{ UserId: decodeToken.id}, {GroupId: findGroup.id }],
      },
    });
    res.status(200).json({ message: "user logout" });
  },
};
