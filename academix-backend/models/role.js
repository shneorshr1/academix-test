'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {

      Role.hasMany(models.RoleAssignment, {
        foreignKey: 'role_code',
        sourceKey: 'code'
      });
    }
  }

  Role.init(
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name_he: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles'
    }
  );

  return Role;
};
