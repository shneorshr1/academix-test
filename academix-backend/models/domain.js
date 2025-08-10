"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    static associate(models) {
      Domain.hasMany(models.Course, { foreignKey: "domainId" });
      Domain.hasMany(models.RoleAssignment, {
        as: "roleAssignments",
        foreignKey: "scope_id",
        constraints: false,
      });
    }
  }

  Domain.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Domain",
    }
  );
  return Domain;
};
