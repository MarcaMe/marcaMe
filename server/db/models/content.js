const Sequelize = require('sequelize');
const db = require('../db');

const Content = db.define('content', {
  title: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  description: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  content: {
    type: Sequelize.JSON,
    defaultValue: []
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://pbs.twimg.com/profile_images/877592634096705536/-cl1NgG4_400x400.jpg'
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isArchived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Content;
