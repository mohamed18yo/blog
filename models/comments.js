'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    content: DataTypes.STRING
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};