import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame } from "../actions";


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
        <div>
            <Link to="/home">
                <button>HOME</button>
            </Link>
            <h1>GAME-CREATOR</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>NAME:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.name && (<p className="errors">{errors.name}</p>)
                    }
                </div>
                <div>
                    <label>DESCRIPTION:</label>
                    <input
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.description && (<p className="errors">{errors.description}</p>)
                    }
                </div>
                <div>
                    <label>RELEASED:</label>
                    <input
                        type="date"
                        value={input.date}
                        name="date"
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>RATING:</label>  {/*arreglar para que sea entre 0 y*/}
                    <input
                        type="number"
                        value={input.rating}
                        name="rating"
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>PLATFORMS:</label>
                    <label><input type="checkbox" name="PC" value="PC" onChange={e => handleCheckPlat(e)}/>PC</label>
                    <label><input type="checkbox" name="PlayStation" value="PlayStation" onChange={e => handleCheckPlat(e)}/>PLAYSTATION</label>
                    <label><input type="checkbox" name="Xbox" value="Xbox" onChange={e => handleCheckPlat(e)}/>XBOX</label>
                </div>
                <div>
                    <label>GENRES:</label>
                    <label onChange={e => handleCheckGen(e)}>
                        {
                            allGenres?.map(genre => {
                                return(
                                    <label><input type="checkbox" value={genre.name}/>{genre.name.toUpperCase()}</label>
                                )
                            })
                        }
                    </label>
                </div>
                <button type="submit">SEND</button>
            </form>
        </div>
    )
}