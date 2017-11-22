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
    type: Sequelize.STRING,
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
  type: {
    type: Sequelize.ENUM('video', 'article', 'pdf'),
    allowNull: false
  },
  embedLink: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Content;
