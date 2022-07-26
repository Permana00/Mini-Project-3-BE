const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Notes, User, Group } = require("../helper/relation");

module.exports = {
  register: async (req, res) => {
    const saltRound = 10;
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRound);
    const data = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword,
    });
    if (!data) {
      res.status(400).json({ message: "failed create user" });
    } else {
      res.status(200).json({ message: "user created", data: data });
    }
  },

  getOneId: async (req, res) => {
    const data = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Notes }],
    });
    if (!data) {
      res.status(400).json({ message: "failed get one user" });
    }
    res.status(200).json({ data });
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!data) {
      throw Error("Data tidak ditemukan");
    }
    const isVeryvied = await bcrypt.compare(password, data.password);
    if (!isVeryvied) {
      throw Error("Password salah");
    }
    const payload = {
      id: data.dataValues.id,
      firstname: data.dataValues.firstname,
    };
    const token = jwt.sign(payload, process.env.TOKEN);
    res.json({
      username: data.username,
      token: token,
      message: "Berhasil masuk",
    });
  },

  logout: async (req, res) => {
    try {
      res.json({ message: "log out berhasil!" });
    } catch (Error) {
      res.json({ message: "coba lagi nanti!" });
    }
  },
};
