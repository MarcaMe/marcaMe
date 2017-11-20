const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const { Content, User } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Content.findAll({
    where: {
      type: 'video'
    }
  })
    .then(videos => res.json(videos))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const url = req.body.url;
  const videoId = url.split('=').pop()
  if (url.indexOf('youtube.com')) {
    request(url, (error, response, html) => {
      let json = {
        title: '',
        image: `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        tags: [],
        description: '',
        content: [],
        type: 'video',
        userId: req.body.userId,
        url
      };
      console.log("JDSFDSKLFJLDSK", json)
      if (!error) {
        let $ = cheerio.load(html);
        json.title = $('meta[itemprop="name"]').attr('content');
        json.tags = $('meta[name=keywords]')
          .attr('content')
          .split(',');
        json.description = $('#eow-description').text();
        json.content = [
          `https://www.youtube.com/embed/${videoId}`
        ];
        // res.send(json)
        Content.create(json)
          .then(_ => res.sendStatus(201))
          .catch(next);
      } else {
        console.error('ERROR IN VIDEOSCRAPING POST', error);
      }
    });
  }
});
