import React from "react";

export default function Card({ name, img, genre, rating }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genre}</h5>
            <h5>{rating}</h5>
            <img src={img} alt="GAME" width="300px" height="250px" />
        </div>
    )
}