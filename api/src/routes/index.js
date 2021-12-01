const { Router } = require('express');
const axios = require("axios");
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeGenre = require("./routeGenre");
const routeAllGames = require("./routeAllGames");
const routeGameId = require("./routeGameId");
const routePostGame = require('./routePostGame');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/genres", routeGenre);
router.get("/videogames", routeAllGames);
router.get("/videogame/:id", routeGameId);
router.post("/videogame", routePostGame);



module.exports = router;
