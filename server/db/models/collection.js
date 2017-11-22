const Sequelize = require('sequelize');
const db = require('../db');
const Content = db.model('content')

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},
  {
    defaultScope: {
      include: [{model: Content}]
    }
  }
);

module.exports = Collection;
