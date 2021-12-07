import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameName } from "../../actions";
import styles from "./SearchBar.module.css";
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getGameName(name));
        setName("");
    }

    return (
        <div className={styles.card}>
            <input className={styles.input} type="text" placeholder="Search.." value={name} onChange={e => handleInputChange(e)}/>
            <button className={styles.btn} type="submit" onClick={e => handleSubmit(e)}><BiSearch/></button>
        </div>
    )
}