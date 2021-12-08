const { Videogame, Genres, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('DB TESTING', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));
    describe('Validators', () => {
      beforeEach(() => Videogame.sync({ force: true }));
      describe('name', () => {
        it('should throw an error if there´s no data', (done) => {
          Videogame.create({})
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });
        it('should work when there´s valid data', () => {
            Videogame.create({
                name: "ARCADE-MANIA",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                date: "08-12-2021",
                rating: 5,
                platform: ["PC ","PlayStation "]
              })
        });
      });
    });
  });
  
