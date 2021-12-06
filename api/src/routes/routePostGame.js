const axios = require("axios");
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;

module.exports = async (req, res) => {
    const genApi = async () => {
        const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
        const genArray = await allGenres.data.results.map(elem => elem.name);
        genArray.forEach(elem => {
            Genres.findOrCreate({
                where: { name: elem }
            })
        })
        const dbGenres = await Genres.findAll();
        return dbGenres;
    }
    await genApi();
    let { name, description, date, rating, platform, genres } = req.body;
    let createGame = await Videogame.create({
        name: name,
        description: description,
        date: date,
        rating: rating,
        platform: platform.map(elem => elem + " ")
    })
    genres.forEach(async genre => {
        let dbGenre = await Genres.findAll({
            where: { name: genre }
        })
        createGame.addGenres(dbGenre);
    })
    res.status(200).send("VIDEOGAME SUCCESSFULLY ADDED");
}
