'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleAssignment extends Model {
    static associate(models) {
    

      RoleAssignment.belongsTo(models.User, { foreignKey: 'user_id' });

      RoleAssignment.belongsTo(models.Role, {
        foreignKey: 'role_code',
        targetKey: 'code'
      });
      
    }
  }

  RoleAssignment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      },
      role_code: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role_code'
      },
      scope_type: {
        type: DataTypes.ENUM('system', 'domain', 'course', 'batch'),
        allowNull: false,
        field: 'scope_type'
      },
      scope_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'scope_id'
      }
    },
    {
      sequelize,
      modelName: 'RoleAssignment',
      tableName: 'RoleAssignments'
    }
  );

  return RoleAssignment;
};
