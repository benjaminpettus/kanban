'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kanban = sequelize.define('Kanban', {
    title: DataTypes.STRING,
    priority: DataTypes.STRING,
    created_by: DataTypes.STRING,
    assigned_to: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Kanban;
};