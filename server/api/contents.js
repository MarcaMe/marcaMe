const router = require('express').Router();
const { Content } = require('../db/models');
const chalk = require('chalk');
require('../../secrets');
const axios = require('axios');
module.exports = router;

/* *************************************************** */
router.post('/chrome', (request, response, next) => {
  console.log(chalk.bgBlue('inside post request'));
  console.log(request.user.dataValues.id)

  const userId = request.user.dataValues.id;
  const mercuryUrl =
    'https://mercury.postlight.com/parser?url=' + request.body.url;
  const config = {
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };

  axios
    .get(mercuryUrl, config)
    .then(res => {
      const title = res.data.title;
      const author = res.data.author;
      const description = res.data.excerpt;
      const content = res.data.content;
      const imageUrl = res.data.lead_image_url;
      const url = request.body.url;
      const tags = request.body.tags ? request.body.tags.split(',') : null;
      return Content.create({
        title,
        author,
        description,
        content,
        imageUrl,
        userId,
        url,
        tags
      })
    })
    .then(data => response.send(data))
    .catch(next);
});
/* *************************************************** */

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',')
  Content.create(req.body)
    .then(content => res.json(content))
    .catch(next);
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
    attributes: ['id', 'title', 'description', 'imageUrl', 'userId', 'createdAt', 'isFavorite', 'isPublic', 'isArchived', 'sharedFrom'],
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
    delete newStory.id;
     Content.create(newStory)
     .then(data => res.json(data))
  })
  .catch(err => console.error(err))
})


router.get('/:id', (req, res) => res.json(req.content));
