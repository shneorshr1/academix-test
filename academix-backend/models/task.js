'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.TaskGroup, { foreignKey: 'taskGroupId' });
      Task.belongsTo(models.User, { foreignKey: 'userId' });
      Task.hasMany(models.TaskAssignment, { foreignKey: "task_id" });

    }
  }
  Task.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      repository_kind: {
        type: DataTypes.ENUM('operational', 'free'),
        allowNull: false
      },
    taskGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskGroups',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
  
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    estimatedMinutes: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    stage: {
      type: DataTypes.ENUM('intro', 'mid', 'final'),
      allowNull: true
    },
    checklistRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requiresSubmission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    linkUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
