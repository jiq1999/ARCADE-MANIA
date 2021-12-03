const axios = require("axios");
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;

module.exports = async (req, res) => {
    const api = async () => {
        let dataApi = [];
        for(var i = 1; i <= 5; i++) {
            let urlApi = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`);
            await urlApi.data.results.map(elem => {
                dataApi.push({
                    id: elem.id,
                    name: elem.name,
                    img: elem.background_image,
                    rating: parseFloat(elem.rating.toFixed(1)),
                    genres: elem.genres.map(elem => elem.name),
                })
            })
        }
        return dataApi;
    }
    
    const db = async () => {
        const dbGames = await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        const dbData = dbGames.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                description: elem.description,
                img: elem.img,
                released: elem.date,
                rating: parseFloat(parseFloat(elem.rating).toFixed(1)), //Number(elem.rating))
                genres: elem.genres.map(elem => elem.name),
                platform: elem.platform,
                fromDB: elem.fromDB
            }
        })
        return dbData;
    }
    
    const getAllGames = async () => {
        const apiInfo = await api();
        const dbInfo = await db();
        const infoTotal = dbInfo.concat(apiInfo);
        return infoTotal;
    }

    const name = req.query.name;
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
}