const Sequelize = require('sequelize');
const db = require('../db');

const Video = db.define('video', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  description: {
    type: Sequelize.TEXT
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Video;
