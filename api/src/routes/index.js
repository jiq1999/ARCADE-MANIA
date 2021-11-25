const { Router } = require('express');
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const api = async () => {
    let dataApi = [];
    for(var i = 1; i <= 5; i++) {
        let urlApi = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`);
        await urlApi.data.results.map(elem => {
            dataApi.push( {
                id: elem.id,
                name: elem.name,
                img: elem.background_image,
                description: elem.description,
                date: elem.released,
                rating: elem.rating,
                platform: elem.parent_platforms.map(elem => elem)
            })
        })
    }
    return dataApi;
}

const db = async () => {
    return await Videogame.findAll({
        includes: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const getAllGames = async () => {
    const apiInfo = await api();
    const dbInfo = await db();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get("/videogames", async(req, res) => {
    const name = req.query.name     //me fijo si me llego algo por url(/games?name=)
    const games = await getAllGames();
    if(name) {
        let game = games.filter(elem => elem.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15);      //utilizo includes para que la busqueda sea amplia y no exacta
        if(game.length) {
            res.status(200).send(game);
        } else {
            res.status(404).send("GAME NOT FOUND")
        } 
    } else {
        res.status(200).send(games);
    }
})
// BUSCAR DE DONDE SACAR LA DESCRIPTION Y GENRES??????

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

router.get("/genres", async(req, res) => {
    const genres = await genApi();
    res.status(200).send(genres);
})

router.post("/videogame", async(req,res) => {
    await genApi();
    let { name, description, date, rating, platform, genres } = req.body;
    let createGame = await Videogame.create({
        name: name,
        description: description,
        date: date,
        rating: rating,
        platform: platform
    })
    /* let dbGenre = await Genres.findAll({
        where: { name: genres }
    })
    createGame.addGenres(dbGenre); */
    genres.forEach(async genre => {
        let dbGenre = await Genres.findAll({
            where: { name: genre.name }
        })
        createGame.addGenres(dbGenre);
    })
    res.status(200).send("VIDEOGAME SUCCESSFULLY ADDED");
})

router.get("/videogame/:id", async(req, res) => {
    const id = req.params.id
    let allGames = await getAllGames();
    if(id) {
        let gameId = await allGames.filter(elem => elem.id == id);
        if(gameId.length) {
            res.status(200).json(gameId);
        } else {
            res.status(404).send("GAME NOT FOUND");
        }
    }
})

module.exports = router;
