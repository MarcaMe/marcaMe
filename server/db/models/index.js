const User = require('./user');
const Content = require('./content');
const Collection = require('./collection');

User.hasMany(Content);
Collection.belongsToMany(User, {through: 'UserCollection'});
Content.belongsToMany(Collection, {through: 'ContentCollection'});

module.exports = {
  User,
  Content,
  Collection
};
