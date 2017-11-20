const User = require('./user');
const Video = require('./video');
const Article = require('./article');

User.hasMany(Video);
User.hasMany(Article);


module.exports = {
  User,
  Video,
  Article
};
