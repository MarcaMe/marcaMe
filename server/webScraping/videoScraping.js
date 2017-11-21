const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const { Content } = require('../db/models');
module.exports = router;

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
    where: {
      type: 'video'
    }
  })
    .then(videos => res.json(videos))
    .catch(next);
});

router.get('/:id', (req, res, next) => res.json(req.content));

router.post('/', (req, res, next) => {
  const url = req.body.url;
  let json = {
    title: '',
    image: '',
    tags: [],
    description: '',
    embedLink: '',
    type: 'video',
    userId: req.body.userId,
    url
  };

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      if (url.includes('youtube.com')) {
        const videoId = url.split('=').pop();
        json.title = $('meta[itemprop="name"]').attr('content');
        json.image = `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        // json.tags = $('meta[name=keywords]').attr('content').split(',');
        json.description = $('#eow-description').text();
        json.embedLink = `https://www.youtube.com/embed/${videoId}`;
      } else {
        // for vimeo, vevo, dailymotion
        const videoId = url.split('/').pop();
        json.title = $('[property=og\\:title]').attr('content');
        json.image = $('[property=og\\:image]').attr('content');
        // json.tags = ($('[property=video\\:tag]').map((i, el)=> $(this).attr('content')))
        json.description = $('[property=og\\:description]').attr('content');
        if (url.includes('vimeo.com'))
          json.embedLink = `https://player.vimeo.com/video/${videoId}`;
        else if (url.includes('dailymotion.com'))
          json.embedLink = `http://www.dailymotion.com/video/${videoId}`;
        else if (url.includes('vevo.com'))
          json.embedLink = `https://embed.vevo.com?isrc=${videoId}`;
      }

      Content.create(json)
        .then(_ => res.sendStatus(201))
        .catch(next);
    } else {
      console.error('ERROR IN VIDEOSCRAPING POST', error);
    }
  });
});
