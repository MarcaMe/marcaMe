const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) res.sendStatus(404);
      req.requestedUser = user;
      next();
      return null;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'profilePicture', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:id', (req, res ) => res.json(req.requestedUser));

router.put('/:id', (req, res, next) => {
  req.requestedUser.update(req.body)
  .then(user => res.json(user))
  .catch(next);
})
