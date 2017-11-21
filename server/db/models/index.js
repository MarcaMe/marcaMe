const User = require('./user');
const Content = require('./content');

User.hasMany(Content);


module.exports = {
  User,
  Content
};
