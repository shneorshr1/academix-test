'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskAssignment extends Model {
    static associate(models) {
      TaskAssignment.belongsTo(models.User, { foreignKey: 'user_id' });
      TaskAssignment.belongsTo(models.Task, { foreignKey: 'task_id' });
      TaskAssignment.belongsTo(models.TeamMember, {
        foreignKey: 'user_id'
      });
    }
  }

  TaskAssignment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('unassigned', 'assigned', 'completed'),
        allowNull: false,
        defaultValue: 'unassigned'
      },
      assigned_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'TaskAssignment',
      tableName: 'TaskAssignments'
    }
  );

  return TaskAssignment;
};
