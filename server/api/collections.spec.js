const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Collection = db.model('collection');
const Content = db.model('content');


describe('Collection routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/collections/', () => {

    beforeEach(() => {
      return Collection.bulkCreate([
        {name: 'An Amazing Collection'},
        {name: 'An Even Better Collection'},
        {name: 'The Best Collection'}
        ]);
    });

    it('GET /api/collections', () => {
      return request(app)
        .get('/api/collections')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(3)
          expect(res.body[0].name).to.be.equal('An Even Better Collection');
        });
    });

    it('POST /api/collections', () => {
      return request(app)
      .post('/api/collections')
      .send({name: 'A posted collection'})
      .expect(200)
      .then(res => {
        expect(res.body).to.haveOwnProperty('name')
        expect(res.body).to.haveOwnProperty('id')
        expect(res.body.name).to.be.equal('A posted collection')
      });
    });

    it('GET /api/collections/:id', () => {
      return request(app)
      .get('/api/collections/1')
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('An Amazing Collection')
        expect(res.body.id).to.equal(1)
      })
    });

    it('PUT /api/collections/:id', () => {
      return request(app)
      .get('/api/collections/1')
      .then(res => {
        const firstReqId = res.body.id;
        return request(app)
        .put(`/api/collections/${res.body.id}`)
        .send({name: 'Updated Name'})
        .expect(200)
        .then(res => {
          const secondReqId = res.body.id
          expect(res.body.name).to.be.equal('Updated Name')
          expect(secondReqId).to.equal(firstReqId)
        })
      })
    });

    it('DELETE /api/collections/:id', () => {
      return request(app)
      .delete('/api/collections/3')
      .expect(200)
      .then(res => {
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal('Collection was Deleted')
      });
    });
  });
});


describe('Eager Loading', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Getting a specific collection', () => {
    let collection;
    let results;
    beforeEach(() => {
      return Collection.create({name: 'Eager Loaded Collection'})
        .then(createdCollection => {
          collection = createdCollection;
          return Content.bulkCreate([
            {id: 1, title: 'A Lovely Article', url: 'www.iamaurl.com', author: 'An Amazing Author'},
            {id: 2, title: 'A Great Read', url: 'www.readme.com', author: 'An Amazing Author'}
          ])
          .then(someResults => {
            results = someResults
            return collection.addContents(results)
          })
        })
    })
    it('is a test', () => {
      return request(app)
      .get('/api/collections/1')
      .expect(200)
      .then(res => {
        expect(res.body.contents).to.be.an('array')
        expect(res.body.contents.length).to.equal(2)
      })
    })

  })
})
