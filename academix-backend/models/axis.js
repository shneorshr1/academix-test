'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Axis extends Model {
    static associate(models) {
      Axis.belongsTo(models.Course, { foreignKey: 'courseId' });
      Axis.hasMany(models.TaskGroup, { foreignKey: 'axisId' });
      Axis.belongsTo(models.Team, {
        foreignKey: "team_id",
        allowNull: true,
      });
    }
  }
  Axis.init({
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Axis',
  });
  return Axis;
};
