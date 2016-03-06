'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Kanbans', 
      'status',
      
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'queue'
      }
    );
     
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.removeColumn(
      'Kanbans', 
      'status'
    );
  }
};
