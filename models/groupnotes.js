'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupNotes.init({
    groupId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    day: DataTypes.STRING,
    note: DataTypes.STRING,
    isPriority: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupNotes',
  });
  return GroupNotes;
};