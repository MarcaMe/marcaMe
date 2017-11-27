const router = require('express').Router()
const { Relationship, User} = require('../db/models')
module.exports = router

router.get('/following/:id', (req, res, next) => {
    const userId = req.params.id;
    let arrPromise= [];
     Relationship.findAll( {where: {userId: userId} })
    .then(data => data.map(record => record.followed))
    .then(recordArr =>  recordArr.map(id => User.findById(id)))
    .then(arrPromise => Promise.all(arrPromise))
    .then(data => res.send(data))
    .catch(next)

})

router.get('/follower/:id', (req, res, next) => {
    const userId = req.params.id;
    Relationship.findAll( {where: {followed: userId}, include: [ User ] } )
    .then(data => res.json(data))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
    const userId = req.params.id;
    const followed = req.body.followedId;
    Relationship.create({userId: userId,followed: followed})
    .catch(next);
  })

router.get('/test', (req, res, next) => {
    User.findAll()
    .then(result => console.log('????', User.prototype ))
})
