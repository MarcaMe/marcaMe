const router = require('express').Router()
const { Collection } = require('../db/models')
module.exports = router


router.param('id', (req, res, next, id) => {
    Collection.findById(id)
    .then(collection => {
        if (!collection) {
        console.log('Collection does not exist')
        res.sendStatus(404)
        }
        if (collection.userId === req.user.id) {
            req.collection = collection;
            next();
        } else {
            res.send('Access Denied')
        }
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
    Collection.findAll({where: {userId: req.user.id}})
    .then(userCollections => {
        res.json(userCollections)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Collection.create(req.body)
    .then((newCollection) => {
        return newCollection.setUser(req.user)
    })
    .then((collection) => res.json(collection))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    res.json(req.collection)
})

router.delete('/:id', (req, res, next) => {
    req.collection.destroy()
    .then(() => res.send('Collection was Deleted'))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    req.collection.update(req.body)
    .then(updatedCollection => res.json(updatedCollection))
    .catch(next);
})

router.post('/:id', (req, res, next) => {
    req.collection.addContent(req.body.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

