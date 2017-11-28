const router = require('express').Router()
const { Relationship, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Relationship.findAll()
    .then(data => res.json(data))
    .catch(next)
})

router.get('/follower/:id', (req, res, next) => {
    const userId = req.params.id;
    Relationship.findAll( {where: {followed: userId}, include: [ User ] } )
    .then(data => res.json(data))
    .catch(next)
})

router.get('/following/:id', (req, res, next) => {
    const userId = req.params.id;
     Relationship.findAll( {where: {userId: userId} })
    .then(data => data.map(record => record.followed))
    .then(recordArr =>  recordArr.map(id => User.findById(id)))
    .then(arrPromise => Promise.all(arrPromise))
    .then(data => res.json(data))
    .catch(next)

})

router.post('/following/:id', (req, res, next) => {
    const userId = req.params.id;
    const followed = req.body.followingId;
    Relationship.findOrCreate( {where: {userId: userId, followed: followed}} )
    .spread( (newRecord, bool) =>  bool ? User.findById(newRecord.dataValues.followed) 
    .then(data => res.json(data))
    : null )
    .catch(next);
  })

  router.delete('/following/:id', (req, res, next) => {
    const userId = req.params.id;
    const followed = req.body.followingId;
    Relationship.findOne( {where: {userId: userId, followed: followed}})
    .then(record => record.destroy())
    .then(() => res.json(followed))
    .catch(next);
  })
