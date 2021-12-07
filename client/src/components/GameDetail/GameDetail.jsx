import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGameDetail } from "../../actions";
import styles from "./GameDetail.module.css"

export default function GameDetail(props) {
    const dispatch = useDispatch();
    const params = useParams()
    const game = useSelector(state => state.detail);


    useEffect(() => {
        dispatch(getGameDetail(params.id))
    },[dispatch])

    

    return(
        <div className={styles.detail}>
            <Link className={styles.link} to="/home">
                <button className={styles.btn}>HOME</button>
            </Link>
            {   
                game.id == params.id?
                <div className={styles.card}>
                    <div>
                        <h1>{game.name.toUpperCase()}</h1>
                        <hr className={styles.hr}/>
                        <div className={styles.ratRel}>
                            <h3>RATING: {game.rating}</h3>
                            <h3>RELEASED: {game.id.length > 7 ? game.date : game.released}</h3>
                        </div>
                        <hr className={styles.hr}/>
                        <div className={styles.genPlat}>
                            <h4>GENRES: {game.genres.map(elem => elem.name.toUpperCase() + " ")}</h4>
                            <h4>PLATFORMS: {game.id.length > 7 ? game.platform.map(elem => elem.toUpperCase()) : game.parent_platforms.map(elem => elem.platform.name.toUpperCase() + " ")}</h4>
                        </div>
                        <hr className={styles.hr}/>
                        <h4 className={styles.descr}>{game.id.length > 7 ? game.description : game.description_raw}</h4>
                    </div>
                    <div className={styles.imgCard}>
                        <img className={styles.img} src={game.img? game.img : game.background_image} alt="GTA V" height="520" width="900"/>
                    </div>
                </div> :
                <div className={styles.load}>
                    <h1>LOADING...</h1>
                </div>
            }
        </div>
    )
}