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