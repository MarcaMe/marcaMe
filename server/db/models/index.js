const User = require('./user');
const Content = require('./content');
const Collection = require('./collection');

User.hasMany(Content);
Collection.belongsTo(User);
User.hasMany(Collection);
Collection.belongsToMany(Content, {through: 'userCollections'});

module.exports = {
  User,
  Content,
  Collection
};
