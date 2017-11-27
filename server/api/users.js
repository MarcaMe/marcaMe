const router = require('express').Router()
const {User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => res.json(user))
    .catch(next)
})

// to test out the chrome extension
router.post('/test', (req, res, next) => {

  console.log('BODY: ', req.body)
  res.sendStatus(200)
})

router.post('/dog', (req, res, next) => {
  console.log('dog: ', req.body)
  res.sendStatus(200)
})
