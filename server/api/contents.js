const router = require('express').Router();
const { Content } = require('../db/models');
const postToMercury = require('./utils')
module.exports = router;

router.post('/', (req, res, next) => {
  const userId = req.user.dataValues.id;
  return postToMercury(userId, req)
    .then(data => res.send(data))
    .catch(err => {
      next(err);
    });
});


router.delete('/:id', (req, res, next) => {
  req.content
    .destroy()
    .then(_ => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  req.content
    .update(req.body)
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
    attributes: ['id', 'title', 'description', 'imageUrl', 'userId', 'createdAt', 'isFavorite', 'isPublic', 'isArchived', 'sharedFrom', 'tags', 'isNew'],
    order: [['createdAt', 'DESC']]
  })
    .then(content => res.json(content))
    .catch(next);
});

router.get('/main', (req, res, next) => {
  Content.findAll({
    where: {userId: req.user.id},
    attributes: ['id', 'title', 'description', 'imageUrl', 'userId', 'createdAt', 'isFavorite', 'isPublic', 'isArchived', 'sharedFrom', 'tags', 'isNew'],
    order: [['createdAt', 'DESC']]
  })
    .then(content => res.json(content))
    .catch(next);
});

router.post('/share', (req, res, next) => {
  const storyId = req.body.contentId;
  const userId = req.body.userId;
  const friendId = req.body.friendId;
  Content.findById(storyId)
  .then(story => {
    let newStory = Object.assign(story).dataValues;
    newStory.userId = friendId;
    newStory.sharedFrom = userId;
    newStory.tags = [];
    newStory.isNew = true;
    newStory.createdAt = Date();
    newStory.isFavorite = false;
    newStory.isPublic = false;
    newStory.isArchived = false;
    delete newStory.id;
     Content.create(newStory)
     .then(data => res.json(data))
  })
  .catch(err => console.error(err))
})


router.get('/:id', (req, res) => res.json(req.content));
