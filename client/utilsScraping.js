import axios from 'axios';
import '../secrets';

export const webScraping = (mercuryUrl, userId) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };
  return axios
    .get(mercuryUrl, config)
    .then(res => {
      const title = res.data.title;
      const author = res.data.author;
      const description = res.data.excerpt;
      const content = res.data.content;
      const imageUrl = res.data.lead_image_url;
      const url = res.data.url;
      return { title, author, description, content, imageUrl, userId, url };
    })
    .catch(error => console.error(error));
};

// res.data have access to:
//-title, author, date_published, lead_image_url, content, url, domain, excerpt, word_count
