'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Axis extends Model {
    static associate(models) {
      Axis.belongsTo(models.Course, { foreignKey: 'courseId' });
      Axis.hasMany(models.TaskGroup, { foreignKey: 'axisId' });
      // בהמשך אפשר להוסיף גם hasMany ל־TaskGroups
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
    }
  }, {
    sequelize,
    modelName: 'Axis',
  });
  return Axis;
};
