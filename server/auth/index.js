const router = require('express').Router()
const User = require('../db/models/user')
const postToMercury = require('../api/utils')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      return postToMercury(user.id, {body: {url: 'https://medium.com/@kend77/welcome-to-marca-354762fc02f5'}})
      .then(_ => {
        req.login(user, err => (err ? next(err) : res.json(user)))
      })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.send(req.user)
})

router.put('/me', (req, res, next) => {
  const newName = req.body.newName;
  const id = req.body.userId;
  User.findById(id)
  .then(user => {
    user.firstName = newName;
    user.save({fields: ['firstName']})
    .then(() => User.findById(id))
    .then(user => res.json(user))
  })
}
)

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))
