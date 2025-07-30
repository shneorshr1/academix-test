'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.CourseBatch, {
        foreignKey: 'course_batch_id',
        as: 'courseBatch'
      });
      

      Team.hasMany(models.TeamMember, {
        foreignKey: 'team_id',
        as: 'teamMembers'
      });
    }
  }

  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      course_batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Team',
      tableName: 'Teams',

      timestamps: true
    }
  );

  return Team;
};
