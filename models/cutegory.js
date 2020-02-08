'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cutegory = sequelize.define('Cutegory', {
    name: DataTypes.STRING
  }, {});
  Cutegory.associate = function(models) {
    // associations can be defined here
  };
  return Cutegory;
};