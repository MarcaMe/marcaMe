const Sequelize = require('sequelize');
const db = require('../db');

const Relationship = db.define('relationship', {
    followed:  Sequelize.INTEGER,
    isNew: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Relationship;
