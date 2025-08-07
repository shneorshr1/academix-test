'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Axes', 'team_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // כדי לא לשבור דאטה קיים
      references: {
        model: 'Teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // או 'CASCADE' אם אתה רוצה למחוק גם את הציר אם הצוות נמחק
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Axes', 'team_id');
  }
};
