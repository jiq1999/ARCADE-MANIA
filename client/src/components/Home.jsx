import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getGames, filterByGenre, filterByOrigin, orderByName, orderByRating } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function HomePage() {
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.videogames)
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getGames())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }

    function handleFilterGamesGen(e) {
        dispatch(filterByGenre(e.target.value));
    }

    function handleFilterGamesOrig(e) {
        dispatch(filterByOrigin(e.target.value));
    }

    function handleOrderGamesName(e) {          //repasar esto, porque set estados locales?? y en los otros no
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`ORDERED ${e.target.value}`)
    }

    function handleOrderGamesRat(e) {          //repasar esto, porque set estados locales?? y en los otros no
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`ORDERED ${e.target.value}`)
    }

    return(
        <div>
            <Link to="/videogame"><button>GAME CREATOR</button></Link>
            <h1>VIDEOGAMES</h1>
            <button onClick={e => {handleClick(e)}}>
                LOAD ALL GAMES
            </button>
            <div>
                <select onChange={e => handleOrderGamesName(e)}>
                    <option value="alfa">ALF ASCENDANT</option>     {/* el value permite acceder con la accion */}
                    <option value="alfd">ALF DESCENDANT</option>
                </select>
                <select onChange={e => handleOrderGamesRat(e)}>
                    <option value="rata">RATING ASCENDANT</option>
                    <option value="ratd">RATING DESCENDANT</option>
                </select>
                <select onChange={e => handleFilterGamesGen(e)}>
                    <option value="All">ALL</option>
                    <option value="Action ">ACTION</option>
                    <option value="Adventure ">ADVENTURE</option>
                    <option value="Arcade ">ARCADE</option>
                    <option value="Board Games ">BOARD GAMES</option>
                    <option value="Card ">CARD</option>
                    <option value="Casual ">CASUAL</option>
                    <option value="Educational ">EDUCATIONAL</option>
                    <option value="Family ">FAMILY</option>
                    <option value="Fighting ">FIGHTING</option>
                    <option value="Indie ">INDIE</option>
                    <option value="Massively Multiplayer ">MASSIVELY MULTIPLAYER</option>
                    <option value="Platformer ">PLATFORMER</option>
                    <option value="Puzzle ">PUZZLE</option>
                    <option value="Racing ">RACING</option>
                    <option value="RPG ">RPG</option>
                    <option value="Shooter ">SHOOTER</option>
                    <option value="Simulation ">SIMULATION</option>
                    <option value="Sports ">SPORTS</option>
                    <option value="Strategy ">STRATEGY</option>
                </select>
                <select onChange={e => handleFilterGamesOrig(e)}>
                    <option value="all">ALL</option>
                    <option value="api">ORIGINAL</option>
                    <option value="db">CREATED</option>
                </select>
                <Paginado
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                />
                <SearchBar/>
                {
                    currentGames?.map(elem => {
                        return(
                            <div className="cards">
                                <Link to={'/details/' + elem.id}>
                                    <Card
                                        key={elem.id}
                                        name={elem.name} 
                                        img={elem.img} 
                                        genre={elem.genres}
                                        rating={elem.rating}
                                    />
                                </Link>
                            </div>
                        ) 
                    })
                }
            </div>
        </div>
    )
}