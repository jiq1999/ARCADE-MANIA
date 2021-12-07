import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame } from "../../actions";
import styles from "./CreateGame.module.css"


export default function GameCreator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allGenres = useSelector(state => state.genres)

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        date: "",
        rating: 0,
        platform: [],
        genres: []
    })

    function handleErrors(input) {
        let errors = {};
        if(!input.name) {
            errors.name = "INVALID NAME";
        }
        else if(!input.description) {
            errors.description = "INVALID DESCRIPTION";
        }
        else if(!input.platform.length) {
            errors.platform = "SELECT A PLATFORM"
        }
        else if(!input.genres.length) {
            errors.genres = "SELECT A GENRE";
        }
        console.log(errors)
        return errors;
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(handleErrors({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheckPlat(e) {
        if(e.target.checked) {
            setInput({
                ...input,
                platform: [...input.platform, e.target.value]
            })
        }
        else if(!e.target.checked) {
            setInput({
                ...input,
                platform: input.platform.filter(elem => elem !== e.target.value)
            })
        }
        setErrors(handleErrors({
            ...input,
            platform: e.target.value
        }))
    }

    function handleCheckGen(e) {
        if(e.target.checked) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        else if(!e.target.checked) {
            setInput({
                ...input,
                genres: input.genres.filter(elem => elem !== e.target.value)
            })
        }
        setErrors(handleErrors({
            ...input,
            genres: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postGame(input));
        alert("GAME CREATED");
        setInput({
            name: "",
            description: "",
            date: "",
            rating: 0,
            platform: [],
            genres: []
        })
        navigate("/home");
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return(
        <div className={styles.creator}>
            <Link className={styles.link} to="/home">
                    <button className={styles.btn}>HOME</button>
            </Link>
            <div className={styles.card}>
                <h1 className={styles.title}>GAME-CREATOR</h1>
                <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                    <div>
                        <div className={styles.name}>
                            <label className={styles.nameTitle}>NAME:</label>
                            <input
                                className={styles.nameInput}
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className={styles.relRat}>
                            <div className={styles.released}>
                                <label className={styles.releasedTitle}>RELEASED:</label>
                                <input
                                    className={styles.releasedInput}
                                    type="date"
                                    value={input.date}
                                    name="date"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div className={styles.rating}>
                                <label className={styles.ratingTitle}>RATING:</label>  {/*arreglar para que sea entre 0 y*/}
                                <input
                                    className={styles.ratingInput}
                                    type="number"
                                    max="5"
                                    value={input.rating}
                                    name="rating"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className={styles.platform}>
                            <label className={styles.platformTitle}>PLATFORMS:</label>
                            <label><input className={styles.platformItem} type="checkbox" name="PC" value="PC" onChange={e => handleCheckPlat(e)}/>PC</label>
                            <label><input className={styles.platformItem} type="checkbox" name="PlayStation" value="PlayStation" onChange={e => handleCheckPlat(e)}/>PLAYSTATION</label>
                            <label><input className={styles.platformItem} type="checkbox" name="Xbox" value="Xbox" onChange={e => handleCheckPlat(e)}/>XBOX</label>
                        </div>
                        <div className={styles.description}>
                            <label className={styles.descriptionTitle}>DESCRIPTION:</label>
                            <textarea
                                className={styles.descriptionInput}
                                type="text"
                                value={input.description}
                                name="description"
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <button className={styles.btnSend} type="submit">SEND</button>
                        {
                            (errors.name || errors.description || !input.platform.length || !input.genres.length)  && (<p className={styles.errors}>{errors.name || errors.description || errors.platform || errors.genres}</p>)
                        }
                    </div>
                    <div className={styles.genres}>
                        <label className={styles.genresTitle}>GENRES:</label>
                        <label className={styles.gen} onChange={e => handleCheckGen(e)}>
                            {
                                allGenres?.map(genre => {
                                    return(
                                        <label><input className={styles.genresItem} type="checkbox" value={genre.name}/>{genre.name.toUpperCase()}</label>
                                    )
                                })
                            }
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}