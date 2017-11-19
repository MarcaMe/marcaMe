const User = require('./user');
const Video = require('./video');

User.hasMany(Video);

module.exports = {
  User,
  Video
};
