'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskGroup extends Model {
    static associate(models) {
      TaskGroup.belongsTo(models.Axis, { foreignKey: 'axisId' });
    }
  }
  TaskGroup.init({
    axisId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Axes',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TaskGroup',
  });
  return TaskGroup;
};
