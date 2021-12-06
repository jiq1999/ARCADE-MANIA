
const initialState = {
    videogames: [],
    allVideogames: [],
    detail: [],
    genres: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        
        case "GET_VIDEOGAME_BY_NAME":
            return {
                ...state,
                videogames: action.payload
            }
        
        case "GET_VIDEOGAME_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "POST_GAME":
            return {
                ...state
            }
        
        case "FILTER_BY_GENRE":
            const allGames = state.allVideogames;
            //const gamesFiltered = action.payload === "All" ? allGames : allGames.filter(elem => elem.genres.includes(action.payload));
            let gamesFiltered = [];
            for(let i = 0; i < allGames.length; i++) {
                if(action.payload === "All") gamesFiltered.push(allGames[i]);
                else if(allGames[i].genres.includes(action.payload)) gamesFiltered.push(allGames[i]);
            }
            return {
                ...state,
                videogames: gamesFiltered
            }
        
        case "FILTER_BY_ORIGIN":
            const allGames2 = state.allVideogames;
            let gamesDbApi = [];
            for(let i = 0; i < allGames2.length; i++) {
                if(action.payload === "all") gamesDbApi.push(allGames2[i]);
                if(action.payload === "db" && allGames2[i].fromDB) gamesDbApi.push(allGames2[i]);
                else if(action.payload === "api" && !allGames2[i].fromDB) gamesDbApi.push(allGames2[i]);
            }
            return {
                ...state,
                videogames: gamesDbApi
            }
        
        case "ORDER_BY_NAME":
            let sortedARr = [];
            if(action.payload === "alfa") {
                sortedARr = state.allVideogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    else if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                    else return 0;
                })
            } else {
                sortedARr = state.allVideogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    else if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                    else return 0;
                })
            }
            return {
                ...state,
                videogames: sortedARr
            }
        
        case "ORDER_BY_RATING":
            let sortArrRat = [];
            if(action.payload === "rata") {
                sortArrRat = state.allVideogames.sort(function(a, b) {
                    return a.rating - b.rating;
                })
            } else {
                sortArrRat = state.allVideogames.sort(function(a, b) {
                    return b.rating - a.rating;
                })
            }
            return {
                ...state,
                videogames: sortArrRat
            }
        default:
            return state;
    }
}

export default rootReducer;