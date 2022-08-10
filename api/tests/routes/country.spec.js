/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Countries, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  idCountry: 1,
  name: 'Argentina',
};

describe('Countries routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Countries.sync({ force: true })
    .then(() => Countries.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /countries/name debe permitir por algunas letras', () => {
    let name ='rg'
    it('should get 201', () =>
      agent.get(`/countries?name=${name}`).expect(201)
    );
  });
  describe('GET /countries/name debe permitir por las primeras letras minusculas', () => {
    let name ='arg'
    it('should get 201', () =>
      agent.get(`/countries?name=${name}`).expect(201)
    );
  });
  describe('GET /countries/name debe permitir por el nombre completo', () => {
    let name ='Argentina'
    it('should get 201', () =>
      agent.get(`/countries?name=${name}`).expect(201)
    );
  });
  describe('GET /countries/name debe dar error status 501', () => {
    let name ='1'
    it('should get 501', () =>
      agent.get(`/countries?name=${name}`).expect(501)
    );
  });
});
