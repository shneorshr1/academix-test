'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      taskGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskGroups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      estimatedMinutes: {
        type: Sequelize.SMALLINT,
        validate: {
          min: 0
        }
      },
      stage: {
        type: Sequelize.ENUM('intro', 'mid', 'final'),
        allowNull: true
      },
      checklistRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      requiresSubmission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      linkUrl: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
