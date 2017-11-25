const User = require('./user');
const Content = require('./content');
const Collection = require('./collection');
const Relationship = require('./relationship');

User.hasMany(Content);
Collection.belongsTo(User);
User.hasMany(Collection);
Collection.hasMany(Content);
User.hasMany(Relationship);

module.exports = {
  User,
  Content,
  Collection,
  Relationship
};
