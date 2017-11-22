const router = require('express').Router()
const { Collection } = require('../db/models')
module.exports = router


router.param('id', (req, res, next, id) => {
    Collection.findById(id)
        .then(collection => {
            if (!collection) {
                console.log('Collection does not exist')
                res.sendStatus(404)
            }   else {
                req.collection = collection;
                next();
            }
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Collection.findAll()
        .then(userCollections => {
            res.json(userCollections)
        })
})

router.post('/', (req, res, next) => {
    Collection.create(req.body)
        .then((newCollection) => {
        newCollection.setUser(req.user)
        })
    .then(() => res.sendStatus(201))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    res.json(req.collection)
})

router.delete('/:id', (req, res, next) => {
    req.collection.delete()
        .then(() => res.send('Collection was Deleted'))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    req.collection.update(req.body)
        .then(updatedCollection => res.jsont(updatedCollection))
        .catch(next);
})

