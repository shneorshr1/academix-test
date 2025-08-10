'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Domain, { foreignKey: 'domainId' });
      Course.hasMany(models.CourseBatch, { foreignKey: 'courseId' });
      Course.hasMany(models.Axis, { foreignKey: 'courseId' });
    }
  }
  Course.init({
    domainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Domains',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: DataTypes.STRING,
    duration_months: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
