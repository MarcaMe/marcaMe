const { expect } = require('chai');
const db = require('../index');
const Content = db.model('content');

describe('Content model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('content column', () => {
    let sample;
    beforeEach(() => {
      return Content.create({
        title: 'this is a title',
        tags: ['corgi', 'is', 'the', 'best'],
        url: 'https://corgi.com',
        type: 'article'
      }).then(article => {
        sample = article;
      });
    });

    it('takes an array of objects, but look like an object', () => {
      expect(Content.attributes.content).to.be.an('object');
    });
    //it actually looks like this: { {"breakfast", "consulting"}, {"meeting", "lunch"} }
  });
});
