const axios = require("axios");
const { Videogame, Genres} = require("../db");
const { APIKEY } = process.env;

module.exports = async (req, res) => {
        let id = req.params.id;
        try {
            if(id.length > 7) {
                let dataPk = await Videogame.findByPk(id);
                if(dataPk) res.status(200).json(dataPk);
            } else {
                let urlId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`);
                let dataId = await urlId.data;
                if(dataId) res.status(200).json(dataId)
            }
        } catch(err) {
            res.status(404).send("GAME NOT FOUND");
        }
}
