const { Countries, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Countries model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Countries.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Countries.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if name is not string', (done) => {
        Countries.create({name : 1})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should create a country', (done) => {
        Countries.create({
          name : 'Argentina',
          continent: 'America',
          capital: 'Capital Federal',
          population: 4300001})
          .then(() => done('the country was created'))
          .catch(() => done());
      });
      it('should throw an error if name is empty', (done) => {
        Countries.create({name : ''})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if name is too long', (done) => {
        Countries.create({name : 'a'.repeat(51)})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
  });
});
