'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cutegoryId: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User)
    Post.belongsTo(models.Cutegory)
    Post.belongsToMany(models.Tag, { through: models.PostTag })
  };
  return Post;
};