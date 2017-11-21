import { create } from 'domain';

const { expect } = require('chai');
const db = require('../index');
const Collection = db.model('collection');
const User = db.model('user');

describe('Collection model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Collection columns', () => {
    let collections;
    beforeEach(() => {
      return Collection.bulkCreate([
        {name: 'collection 1'},
        {name: 'collection 2'},
        {name: 'collection 3'},
        {name: 'collection 4'}
      ])
      .then(results => {
        collections = results;
      })
    })

    it('creates collections for organizing content', () => {
      expect(collections).to.be.an('array')
    })
    it('has a field for a user to name the collection', () => {
      expect(collections[0].dataValues).to.haveOwnProperty('name')
    })
    it('does not allow name to be null or empty, with error type "Validation error"', () => {
      Collection.create({
        name: ''
      })
      .catch(error => {
        expect(error.errors).to.be.an('array')
        expect(error.errors[0].type).to.be.equal('Validation error')
      })
    })
  })

  describe('User association', () => {
    let testCollection;
    let kenny;
    beforeEach(() => {
      let user = User.create({
        email: 'kenny@puppybook.com',
        password: 'bones',
        firstName: 'kenny',
        lastName: 'puppybook'
      })

      let collection = Collection.create({
        name: 'Kenny\'s super cool collection'
      })
      return Promise.all([user, collection])
        .then(([createdUser, createdCollection]) => {
          kenny = createdUser;
          createdCollection.userId = createdUser.id
          return createdCollection.reload()
        })
        .then(userCollection => {
          testCollection = userCollection;
        })
    });

    it('creates a collection associated with a user', () => {
      expect(testCollection.userId).to.be.equal(kenny.id);
    });
  });
});
