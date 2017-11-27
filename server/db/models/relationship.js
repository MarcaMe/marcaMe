const Sequelize = require('sequelize');
const db = require('../db');

const Relationship = db.define('relationship', {
    followed:  Sequelize.INTEGER
})

module.exports = Relationship;
