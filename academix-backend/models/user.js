'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // תוסיף קשרים אחרים כאן בהמשך
      User.hasMany(models.Task, { foreignKey: 'userId' });
      User.hasMany(models.TaskAssignment, { foreignKey: 'user_id' });
      User.hasMany(models.TeamMember, { foreignKey: 'user_id' });
      User.hasMany(models.RoleAssignment, { foreignKey: 'user_id' });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
