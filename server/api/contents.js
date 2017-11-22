const router = require('express').Router();
const { Content } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Content.create(req.body)
    .then(content => res.json(content))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  Content.findById(id)
    .then(content => {
      if (!content) res.sendStatus(404);
      req.content = content;
      next();
      return null;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Content.findAll({
    attributes: ['id', 'title', 'description', 'imageUrl', 'userId']
  })
  .then(content => res.json(content))
  .catch(next)
});

router.get('/:id', (req, res) => res.json(req.content));
