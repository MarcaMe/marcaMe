const router = require('express').Router()
const {User, Video} = require('../db/models')
module.exports = router

router.post('/', (req, res, next ) => {
  Video.create(req.body)
  .then(_ => res.sendStatus(201))
  .catch(next)
})
