const Sequelize = require('sequelize');
const db = require('../db');

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Collection;
