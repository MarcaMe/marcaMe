const { expect } = require('chai');
const request = require('supertest');
const session = require('supertest-session');
const db = require('../db');
const app = require('../index');
const Collection = db.model('collection');
const User = db.model('user');


describe('Collection routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/collections/', () => {
    let collections;
    const testSession = session(app)
    const user = {email: 'cody@mail.com', password: '123'}
    beforeEach(() => {
      return User.create(user)
      .then(_ => {
        return testSession
        .post('/auth/login')
        .send({email: user.email, password: '123'})
      })
      .then(_ => {
        return Collection.bulkCreate([
          {name: 'An Amazing Collection', userId: 1},
          {name: 'An Even Better Collection', userId: 1},
          {name: 'The Best Collection', userId: 1}
          ],
          {returning: true})
      })
      .then(created => {
        collections = created
      })
    });
    it('GET /api/collections', () => {
      return testSession
        .get('/api/collections')
        .send()
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(3)
          expect(res.body[0].name).to.be.equal('An Amazing Collection');
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
      return testSession
      .get(`/api/collections/${collections[0].id}`)
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('An Amazing Collection')
        expect(res.body.id).to.equal(1)
      })
    });

    it('PUT /api/collections/:id', () => {
        return testSession
        .put(`/api/collections/${collections[0].id}`)
        .send({name: 'Updated Name'})
        .expect(200)
        .then(res => {
          const secondReqId = res.body.id
          expect(res.body.name).to.be.equal('Updated Name')
          expect(secondReqId).to.equal(collections[0].id)
        })
    });

    it('DELETE /api/collections/:id', () => {
      return testSession
      .delete('/api/collections/3')
      .expect(200)
      .then(res => {
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal('Collection was Deleted')
      });
    });
  });
});

