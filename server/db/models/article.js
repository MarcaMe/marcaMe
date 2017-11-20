const Sequelize = require('sequelize');
const db = require('../db');

const Article = db.define('article', {
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
  }

});

module.exports = Article;
