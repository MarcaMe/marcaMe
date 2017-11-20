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
  image: {
    type: Sequelize.STRING,
    defaultValue: "https://pbs.twimg.com/profile_images/877592634096705536/-cl1NgG4_400x400.jpg"
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
