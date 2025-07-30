'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    static associate(models) {
      TeamMember.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      TeamMember.belongsTo(models.Team, {
        foreignKey: 'team_id'
      });
     
    }
  }

  TeamMember.init(
    {
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      member_role: {
        type: DataTypes.ENUM('instructor', 'assistant', 'viewer', 'student'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TeamMember',
      tableName: 'TeamMembers'
    }
  );

  return TeamMember;
};
