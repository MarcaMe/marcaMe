const router = require('express').Router()
const {Content} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    Content.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})
