const session = require('supertest-session');
const app = require('../../src/app.js'); // Importo el archivo de entrada del server de express.
const { expect } = require('chai');

const agent = session(app);

xdescribe('BACK TESTING', () => {
  describe('GET /videogames', () => {
    it('responds with 200', () => agent.get('/videogames').expect(200));
    it('responds with and object with more than or equal to 100 videogames', () =>
        agent.get('/videogames').then((res) => {
          expect(res.body.length).greaterThanOrEqual(100);
        }));
  });
  describe('GET /videogames?name', () => {
    it('responds with 200', () => agent.get('/videogames?name=the').expect(200));
    it('responds with and object with less than or equal to 15 videogames', () =>
        agent.get('/videogames?name=the').then((res) => {
          expect(res.body.length).lessThanOrEqual(15);
        }));
  });
  describe('GET /videogame/:id', () => {
    it('responds with 200 if the game exists', () => agent.get('/videogame/3498').expect(200));
    it('responds with 404 if the game does not exist', () => agent.get('/videogame/3499').expect(404));
  });
  describe('GET /genres', () => {
    it('responds with 200', () => agent.get('/genres').expect(200));
    it('responds with and object with the total of 19 genres', () =>
        agent.get('/genres').then((res) => {
          expect(res.body.length).equals(19);
        }));
  });
})
