const sequelize = require("../models/index").sequelize;
const { DataTypes } = require("sequelize");

const User = require("../models/user")(sequelize, DataTypes);
const Notes = require("../models/notes")(sequelize, DataTypes);
const Group = require("../models/group")(sequelize, DataTypes);
const UserGroups = require("../models/usergroup")(sequelize, DataTypes);
const GroupNotes = require("../models/groupnotes")(sequelize, DataTypes);

User.hasMany(Notes, { foreignKey: "userId" });
Group.hasMany(GroupNotes, { foreignKey: "groupId" });
User.belongsToMany(Group, { through: UserGroups });
Group.belongsToMany(User, { through: UserGroups });

module.exports = {
  User,
  Notes,
  Group,
  UserGroups,
  GroupNotes,
};
