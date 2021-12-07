import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({ gamesPerPage, allGames, paginado }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <div className={styles.paginado}>
                {
                    pageNumbers?.map(number => (
                        <div key={number}>
                            <button className={styles.btnPag} onClick={() => paginado(number)}>{number}</button>
                        </div>
                    ))
                }
            </div>
        </nav>
    )
}