const axios = require("axios");
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;

module.exports = async (req, res) => {
    const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
    const genArray = await allGenres.data.results.map(elem => elem.name);
    genArray.forEach(elem => {
        Genres.findOrCreate({
            where: { name: elem }
        })
    })
    const dbGenres = await Genres.findAll();
    res.status(200).send(dbGenres);
}