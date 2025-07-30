'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseBatch extends Model {
    static associate(models) {
      CourseBatch.belongsTo(models.Course, { foreignKey: 'courseId' });
      CourseBatch.hasMany(models.Team, { foreignKey: 'course_batch_id' });
    }
  }
  CourseBatch.init({
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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'archived'),
      defaultValue: 'draft'
    }
  }, {
    sequelize,
    modelName: 'CourseBatch',
  });
  return CourseBatch;
};
