const router = require('express').Router()
const {User, Relationship} = require('../db/models')
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


router.post('/:id', (req, res, next) => {
  // expecting the followed ID from req.body 
  const userId = req.params.id;
  const followed = req.body.followedId;
  Relationship.create({userId, followed})
  .then(newRecord => res.json(newRecord.dataValues))
  .catch(next);
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
