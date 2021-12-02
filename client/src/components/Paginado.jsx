import React from "react";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="paginado">
                {
                    pageNumbers?.map(number => (
                        <li className="number" key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}