const Sequelize = require('sequelize');
const db = require('../db');

const Content = db.define('content', {
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
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://pbs.twimg.com/profile_images/877592634096705536/-cl1NgG4_400x400.jpg'
  },
  type: {
    type: Sequelize.ENUM('video', 'article', 'pdf'),
    allowNull: false
  }
});

module.exports = Content;
