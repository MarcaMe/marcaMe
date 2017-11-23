const router = require('express').Router();
const { Content } = require('../db/models');
const chalk = require('chalk');
module.exports = router;

/* *************************************************** */
require('../../secrets');
const axios = require('axios');

router.post('/chrome', (request, response, next) => {
  console.log(chalk.bgBlue('Im in the request'));

  const userId = 1; // HARD CODED userID
  const mercuryUrl =
    'https://mercury.postlight.com/parser?url=' + request.body.url;
  const config = {
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };

  return axios
    .get(mercuryUrl, config)
    .then(res => {
      console.log(chalk.bgGreen(res.data.title));
      const title = res.data.title;
      const author = res.data.author;
      const description = res.data.excerpt;
      const content = res.data.content;
      const imageUrl = res.data.lead_image_url;
      const url = request.body.url;
      Content.create({
        title,
        author,
        description,
        content,
        imageUrl,
        userId,
        url
      }).then(() => response.sendStatus(201));
    })
    .catch(next);
});

/* *************************************************** */

router.post('/', (req, res, next) => {
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
    attributes: ['id', 'title', 'description', 'imageUrl', 'userId']
  })
    .then(content => res.json(content))
    .catch(next);
});

router.get('/:id', (req, res) => res.json(req.content));
