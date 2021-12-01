
const initialState = {
    videogames: [],
    allVideogames: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case "FILTER_BY_GENRE":
            const allGames = state.allVideogames;
            
            //const genreFiltered = action.payload === "All" ? allGames : allGames.filter(elem => elem.genres === action.payload)
            let gamesFiltered = [];
            if(action.payload === "All") {
                return allGames;
            } else {
                for(var i = 0; i < allGames.length; i++) {
                    let gen = allGames[i].genres.map(elem => elem.name);
                    if(gen.includes(action.payload)) gamesFiltered.push(allGames[i]);
                }
            }
            return {
                ...state,
                videogames: gamesFiltered
            }
        default:
            return state;
    }
}

export default rootReducer;