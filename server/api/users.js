const router = require('express').Router()
const {User} = require('../db/models')
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


// router.put('/:id', (req, res, next) => {
//   const id = req.params.id
//   const newComment = req.body.comment;
//   const newLove = req.body.love;
//   Log.findById(id)
//   .then(log => {
//       log.comment = newComment;
//       log.love = newLove;
//       log.save({fileds : ['comment', 'love'] })
//   })
//   .then( () => res.end())
//   .catch(next)
// })


// router.put('/:id', (req, res, next) => {
//   // expecting a follow
//   const userId = req.params.id;
//   const 
// })


// to test out the chrome extension
router.post('/test', (req, res, next) => {

  console.log('BODY: ', req.body)
  res.sendStatus(200)
})

router.post('/dog', (req, res, next) => {
  console.log('dog: ', req.body)
  res.sendStatus(200)
})
