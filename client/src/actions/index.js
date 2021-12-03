import axios from "axios";

export function getGames() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/videogames",{

        });
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getGameName(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`,{

            });
            return dispatch({
                type: "GET_VIDEOGAME_BY_NAME",
                payload: json.data
            })
        } catch(err) {
            console.log(err);
        }
    }
}

export function getGenres() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/genres",{

        });
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function postGame(payload) {
    return async function(dispatch) {
        var response = await axios.post(`http://localhost:3001/videogame`, payload);
        return response;
    }
}

export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}