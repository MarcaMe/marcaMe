const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const { Content } = require('../db/models');
module.exports = router;

//url = 'https://www.nytimes.com/2017/11/16/opinion/saudi-arabia-reform-islamists.html?action=click&pgtype=Homepage&clickSource=story-heading&module=opinion-c-col-left-region&region=opinion-c-col-left-region&WT.nav=opinion-c-col-left-region';
//url = 'https://medium.com/personal-growth/declutter-your-life-declutter-your-mind-4c7f965d6839';
//url='https://hbr.org/2017/11/why-the-entire-c-suite-needs-to-use-the-same-metrics-for-cyber-risk';
//url = 'https://www.youtube.com/watch?v=s0W76XQvrZw'
//url='https://www.nytimes.com/2017/11/16/us/politics/republican-tax-plans-corporations.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=b-lede-package-region&region=top-news&WT.nav=top-news';
//url = 'https://www.nytimes.com/2017/11/16/opinion/sunday/confederate-statues-lee-family.html?action=click&pgtype=Homepage&clickSource=story-heading&module=opinion-c-col-right-region&region=opinion-c-col-right-region&WT.nav=opinion-c-col-right-region';
//let url = 'https://hbr.org/2017/11/how-to-excel-at-both-strategy-and-execution';
//url='http://www.businessinsider.com/how-tesla-designs-cars-to-look-so-good-2017-11';
let url = 'https://www.washingtonpost.com/news/worldviews/wp/2017/11/19/what-the-parasites-in-a-defectors-stomach-tell-us-about-north-korea/?utm_term=.8425ddda7d3a';
//let url = 'https://scotch.io/bar-talk/vuejs-and-reactjs-a-quick-comparison';

const findDescription = (firstParaOfArticle) => {
    for(let key in firstParaOfArticle){
        return firstParaOfArticle[key];
    }
}


router.post('/', function(req, res) {
  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html);
      let contentSelector;
      let article = {
        title: '',
        description: '',
        url: url,
        content: [],
        image: '',
        type: 'article',
         userId: req.body.userId,        
      };

      if (url.slice(12, 19) === 'nytimes') {
        contentSelector = '.story-body.story-body-1';
      }

      if (url.slice(8, 11) === 'hbr') {
        contentSelector = '.article-first-row';
      }

      if (url.slice(8, 14) === 'medium') {
        contentSelector = '.section-inner.sectionLayout--insetColumn';
      }

      if (url.slice(12, 26) === 'washingtonpost') {
        contentSelector = '.paywall';
      }

      if (url.slice(8, 17) === 'scotch.io') {
        contentSelector = '.article__content.content.column';
      }

      $('title').filter(function() {
        let data = $(this);
        let title = data.text();
        article.title = title;
      });

      $('[property=og\\:image]').each(function() {
        let data = $(this);
        let img = data.attr('content');
        article.image = img;
      });

      $(`${contentSelector}`).each(function() {
        let data = $(this);
        let htmlTags = data.children();
        for (let key in htmlTags) {
          if (htmlTags[key].name === 'h1') {
            let obj = {};
            let tagName = 'h1';
            let text = htmlTags[key].children[0].data;
            obj[tagName] = text;
            article.content.push(obj);
          }
          if (htmlTags[key].name === 'h2') {
            let obj = {};
            let tagName = 'h2';
            let text = htmlTags[key].children[0].data;
            obj[tagName] = text;
            article.content.push(obj);
          }

          if (htmlTags[key].name === 'h3') {
            let obj = {};
            let tagName = 'h3';
            let text = htmlTags[key].children[0].data;
            obj[tagName] = text;
            article.content.push(obj);
          }
          if (htmlTags[key].name === 'h4') {
            let obj = {};
            let tagName = 'h4';
            let text = htmlTags[key].children[0].data;
            obj[tagName] = text;
            article.content.push(obj);
          }

          if (htmlTags[key].name === 'p') {
            if (
              htmlTags[key].children[0].next &&
              htmlTags[key].children[0].next.name === 'a'
            ) {
              let tagName = 'a';
              let link = htmlTags[key].children[0].next.attribs.href;
              // there is the LINK for a tag! 
              let text = htmlTags[key].children[0].next.children[0].data;
              let obj = {};
              obj[tagName] = text;
              article.content.push(obj);
            } else {
              let obj = {};
              let tagName = 'p';
              let text = htmlTags[key].children[0].data;
              obj[tagName] = text;
              article.content.push(obj);
            }
          }
          if (htmlTags[key].name === 'ul') {
            let pointer = htmlTags[key].children[0];
            while (pointer && pointer.name === 'li') {
              let obj = {};
              let tagName = 'li';
              let text = pointer.children[0].data;
              obj[tagName] = text;
              article.content.push(obj);
              pointer = pointer.next;
            }
          }

          if (htmlTags[key].name === 'blockquote') {
            let obj = {};
            let tagName = 'blockquote';
            let text = htmlTags[key].children[0].data;
            obj[tagName] = text;
            article.content.push(obj);
          }
        }
      });
     article.description = findDescription(article.content[0]);
      Content.create(article);
      res.send(article);
    } else {
      throw error;
    }
  });
});
