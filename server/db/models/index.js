const User = require('./user');
const Content = require('./content');
const Collection = require('./collection');
const Relationship = require('./relationship');

User.hasMany(Content);
Collection.belongsTo(User);
User.hasMany(Collection);
Collection.belongsToMany(Content, {through: 'userCollections', onDelete: 'CASCADE'});
User.hasMany(Relationship);
Relationship.belongsTo(User);
module.exports = {
  User,
  Content,
  Collection,
  Relationship
};
