const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const userModel = require("../models/user");
const Users = userModel(sequelize, DataTypes);

const middleWareJWT = (req, res, next) => {
  const token = req.headers.token;
  const user = jwt.decode(token, process.env.secret_token_jwt);
  if (!user || !token) {
    return res.status(401).json({ message: "Harap Register atau login dulu" });
  }
  req.payload = user;

  next();
};

module.exports = {
  middleWareJWT,
};
