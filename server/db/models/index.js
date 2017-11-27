const User = require('./user');
const Content = require('./content');
const Collection = require('./collection');
const Relationship = require('./relationship');

User.hasMany(Content);
Collection.belongsTo(User);
User.hasMany(Collection);
Collection.belongsToMany(Content, {through: 'userCollections'});
User.hasMany(Relationship);
Relationship.belongsTo(User);
//User.belongsToMany(User, {as : 'followed', through: 'follower'})
module.exports = {
  User,
  Content,
  Collection,
  Relationship
};
