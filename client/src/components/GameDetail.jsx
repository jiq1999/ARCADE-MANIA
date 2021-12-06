import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGameDetail } from "../actions";

export default function GameDetail(props) {
    const dispatch = useDispatch();
    const params = useParams()
    const game = useSelector(state => state.detail);


    useEffect(() => {
        dispatch(getGameDetail(params.id))
    },[dispatch])

    

    return(
        <div>
            {   
                game.id == params.id?
                <div>
                    <h1>{game.name.toUpperCase()}</h1>
                    <img src={game.img? game.img : game.background_image} alt="GTA V" width="600px" height="400px"/>
                    <h3>{game.rating}</h3>
                    <h3>{game.id.length > 7 ? game.date : game.released}</h3>
                    <h3>{game.genres.map(elem => elem.name + " ")}</h3>
                    <h3>{game.id.length > 7 ? game.platform : game.parent_platforms.map(elem => elem.platform.name + " ")}</h3>
                    <h4>{game.id.length > 7 ? game.description : game.description_raw}</h4>
                </div> :
                <p>LOADING...</p>
            }
            <Link to="/home">
                <button>HOME</button>
            </Link>
        </div>
    )
}