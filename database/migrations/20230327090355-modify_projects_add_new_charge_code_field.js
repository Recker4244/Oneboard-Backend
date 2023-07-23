'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'project_details', // table name
      'charge_codes', // new field name
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('project_details', 'charge_codes');
  },
};
