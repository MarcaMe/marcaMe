const axios = require('axios');
const { Content } = require('../db/models');
require('../../secrets');

const postToMercury = (userId, request) => {
  const mercuryUrl =
    'https://mercury.postlight.com/parser?url=' + request.body.url;
  const config = {
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };
  return axios.get(mercuryUrl, config).then(res => {
    const title = res.data.title;
    const author = res.data.author;
    const description = res.data.excerpt;
    const content = res.data.content;
    const imageUrl = res.data.lead_image_url;
    const url = request.body.url;
    const tags = request.body.tags ? request.body.tags.split(',') : [];
    return Content.create({
      title,
      author,
      description,
      content,
      imageUrl,
      userId,
      url,
      tags
    });
  });
};

module.exports = postToMercury;
